import type { Hash } from '../types';
import { sepolia, mantle, optimism, linea, polygonZkEvm, } from 'wagmi/chains'

export interface TGetNumberOfProperties {
  owner: Hash
}

export interface TChainContracts {
  name: string;
  address: Hash,
}

export interface TContracts {
  [id: string]: TChainContracts
}

export const contracts: TContracts = {
  [sepolia.id]: {
    name: 'sepolia',
    address: '0x6fc2b18b6b8587eb65d5c9ffaff60fe380eb92d3',
  },
}
