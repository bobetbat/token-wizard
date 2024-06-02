import { ethers } from "hardhat";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log('Deploying contracts with the account:', deployer.address);

    console.log('Account balance:', (await deployer.getBalance()).toString());

    const Factory = await ethers.getContractFactory("Factory");
    const myFactory = await Factory.deploy(deployer.address);

    console.log('Contract is deploying...');
    const tx = await myFactory.deployed();  // Correct method to wait for the contract to be deployed

    console.log('Contract is deployed');
    // const tx = await myFactory.setWhitelist(deployer.address, true);

    console.log(`Tx hash for whitelisting deployer address: ${tx.hash}`);
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1;
});
