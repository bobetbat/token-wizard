import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { mantle, optimism, linea, polygonZkEvm, } from 'wagmi/chains'
import { zircuitTestnet } from './chains'

// polygonZkEvm.rpcUrls
export const config = getDefaultConfig({
  appName: 'WeSaw',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  chains: [mantle, optimism, linea, polygonZkEvm, zircuitTestnet],
  transports: {
    [mantle.id]: http(),
    [optimism.id]: http(),
    [linea.id]: http(),
    [polygonZkEvm.id]: http(),
    [zircuitTestnet.id]: http(),
  },
})
