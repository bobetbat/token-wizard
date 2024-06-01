import { HardhatUserConfig } from "hardhat/config";
import { mantle, optimism, linea, polygonZkEvm } from 'wagmi/chains'
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""]
    },
    zircuit: {
      url: "https://zircuit1.p2pify.com",
      accounts: [process.env.PRIVATE_KEY ?? ""]
    },
    mantle: {
      url: mantle.rpcUrls.default.http[0],
      accounts: [process.env.PRIVATE_KEY ?? ""]
    },
    polygonZkEvm: {
      url: polygonZkEvm.rpcUrls.default.http[0],
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },

    optimism: {
      url: optimism.rpcUrls.default.http[0],
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },

    linea: {
      url: linea.rpcUrls.default.http[0],
      accounts: [process.env.PRIVATE_KEY ?? ""],
    }
  },
  solidity: "0.8.20",
};

export default config;
