import { ethers } from "hardhat";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log('Deploying contracts with the account:', deployer.address);

    console.log('Account balance:', (await deployer.getBalance()).toString());

    const My404 = await ethers.getContractFactory("My404");
    const my404 = await My404.deploy(deployer.address);
    
    console.log('Contract is deploying...');
    await my404.deployed();  // Correct method to wait for the contract to be deployed
    
    console.log('My404 contract is deployed. Token address:', my404.address);  // Address of the deployed contract is accessed via the .address property

    console.log('Whitelisting deployer address...');
    const tx = await my404.setWhitelist(deployer.address, true);
    
    console.log('Waiting for setWhitelist transaction...');
    await tx.wait();
    
    console.log(`Tx hash for whitelisting deployer address: ${tx.hash}`);
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1;
});
