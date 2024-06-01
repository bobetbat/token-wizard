import { Hash } from "../types"

export const short: (hash: string | Hash) => string = (hash) => {
  return hash.slice(0, 5) + '...' + hash.slice(-4)
}
export const getCIDFromIPFSLink = (ipfsLink: string): string | null => {
  if (ipfsLink.startsWith('ipfs://')) {
      return ipfsLink.slice(7); // Remove 'ipfs://' from the start
  }
  
  const ipfsPathPrefix: string = '/ipfs/';
  const ipfsPathIndex: number = ipfsLink.indexOf(ipfsPathPrefix);
  if (ipfsPathIndex !== -1) {
      return ipfsLink.slice(ipfsPathIndex + ipfsPathPrefix.length);
  }
  
  console.error('Invalid IPFS link format:', ipfsLink);
  return null;
};
