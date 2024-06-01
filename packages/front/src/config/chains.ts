import type { Chain } from 'wagmi/chains'

export const zircuitTestnet: Chain = {
  id: 48899,
  name: 'Zircuit Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://zircuit1.p2pify.com']
    },
    public: {
      http: ['https://zircuit1.p2pify.com']
    }
  },
  blockExplorers: {
    default: {
      name: 'explorer',
      url: 'https://explorer.zircuit.com'
    }
  }
}
