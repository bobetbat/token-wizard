
import { ethers } from 'hardhat'
import dotenv from 'dotenv';

dotenv.config();
async function main() {
    const toAddress = '0x1397C19e26aC77c0bfca02E4ff94eaEee20e0A77'
    const contractAddress = '0x0A96224B3362CF6C98C54fd340939ac96687FF8c'
    console.log('Sending My404 token...')
    const my404 = await ethers.getContractAt('My404', contractAddress)
    const tx = await my404.transfer(toAddress, ethers.utils.parseEther('20'))
    await tx.wait()
    console.log(`Tx hash for sending My404 token: ${tx.hash}`)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})


