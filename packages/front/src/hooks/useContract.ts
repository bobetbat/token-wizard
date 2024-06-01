import type { Provider, InterfaceAbi } from 'ethers';
import ethers from 'ethers';
import { useState, useEffect } from 'react';

// Initialize logger

export type UseContractHook = [
  contract: ethers.Contract | undefined,
  loading: boolean,
  error: string | undefined,
];


export const useContract = (
  address: string,
  abi: InterfaceAbi,
  provider?: Provider,
  withSigner = true
): UseContractHook => {
  const [contract, setContract] = useState<ethers.Contract | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    if (!provider) {
      return;
    }
    try {
      setContract(new ethers.Contract(address, abi, provider))
      setLoading(false);
    } catch (error) {
      console.log(error);
      const message = (error as Error).message || 'Unknown contract library error';
      setError(message);
      setLoading(false);
    }
  }, [provider, withSigner]);

  return [contract, loading, error];
};
