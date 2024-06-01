import type { Hash } from '../types';

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
  5001: {
    name: 'mantleTestnet',
    address: '0x',
  },
}
