import React, { useCallback, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import Factory from '../abi/factory.json';
import { Hash } from '../types';
import { contracts } from '../config/contract';

type MintEstateTokenHook = {
  deploy: (metadata: Record<string, unknown>) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useDeploy = (): MintEstateTokenHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useAccount()
  const { writeContractAsync } = useWriteContract();

  const deploy = useCallback(
    async (metadata: Record<string, unknown>) => {
      setLoading(true);
      setError(null);

      try {
        if (!chainId) {
          throw Error('chainId is undefined')
        }
        const res = await writeContractAsync({
          abi: Factory.output.abi,
          address: contracts[chainId].address, // Replace with your contract address
          functionName: 'deployNewERC20Token',
          args: [
            metadata.name,
            metadata.symbol,
            metadata.decimals,
            metadata.initialSupply
          ],
        });
        console.log("MINT RES", res)
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? '');
        console.log('MINT ERROR', err)

        setLoading(false);
      }
    },
    [chainId],
  );

  return { deploy, loading, error };
};

