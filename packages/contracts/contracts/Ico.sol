// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract EnhancedCrowdsale is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 private _token;
    address payable private _wallet;
    uint256 private _rate;
    uint256 private _weiRaised;
    IUniswapV2Router02 private _uniswapRouter;

    uint256 public vestingDuration;
    uint256 public teamAllocation;
    uint256 public teamClaimed;
    uint256 public vestingStart;

    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
    event LiquidityAdded(uint256 tokenAmount, uint256 ethAmount);
    event TeamTokensClaimed(uint256 amount);

    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token,
        address uniswapRouterAddress,
        uint256 _teamAllocation,
        uint256 _vestingDuration,
        address initialOwner  // Add this parameter for the owner
        )
        Ownable(initialOwner) {
            require(rate > 0, "Crowdsale: rate is 0");
            require(wallet != address(0), "Crowdsale: wallet is the zero address");
            require(address(token) != address(0), "Crowdsale: token is the zero address");
            require(address(uniswapRouterAddress) != address(0), "Crowdsale: Uniswap router is the zero address");

            _rate = rate;
            _wallet = wallet;
            _token = token;
            _uniswapRouter = IUniswapV2Router02(uniswapRouterAddress);
            teamAllocation = _teamAllocation;
            vestingDuration = _vestingDuration;
            vestingStart = block.timestamp;
        }

    receive() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable nonReentrant {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);

        uint256 tokens = _getTokenAmount(weiAmount);
        _weiRaised += weiAmount;

        _token.safeTransfer(beneficiary, tokens);
        emit TokensPurchased(msg.sender, beneficiary, weiAmount, tokens);

        _forwardFunds();
    }

    function claimTeamTokens() public onlyOwner {
        require(block.timestamp >= vestingStart + vestingDuration, "Vesting period has not ended");
        require(teamClaimed < teamAllocation, "All tokens claimed");

        uint256 tokensToClaim = teamAllocation - teamClaimed;
        teamClaimed += tokensToClaim;

        _token.safeTransfer(owner(), tokensToClaim);
        emit TeamTokensClaimed(tokensToClaim);
    }

    function addLiquidity() public onlyOwner {
        require(_weiRaised > 0, "No funds raised");

        uint256 ethAmount = address(this).balance;
        uint256 tokenAmount = _getTokenAmount(ethAmount);

        _token.approve(address(_uniswapRouter), tokenAmount);

        _uniswapRouter.addLiquidityETH{ value: ethAmount }(
            address(_token),
            tokenAmount,
            0,  // Slippage is unavoidable
            0,  // Slippage is unavoidable
            owner(),
            block.timestamp
        );

        emit LiquidityAdded(tokenAmount, ethAmount);
    }

    function _forwardFunds() internal {
        _wallet.transfer(msg.value);
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount * _rate;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        require(beneficiary != address(0), "Beneficiary is the zero address");
        require(weiAmount != 0, "WeiAmount is 0");
    }
}
