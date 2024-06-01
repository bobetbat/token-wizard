import React, { useCallback, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
// import EstateToken from '../../../contracts/artifacts/contracts/EstateToken.sol/EstateToken.json'; // Adjust the path according to your project structure
import { Hash } from '../types';
import { contracts } from '../config/contract';

type MintEstateTokenHook = {
  mint: (metadata: Record<string, unknown>) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useMintToken = (): MintEstateTokenHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnecting, isDisconnected, chainId } = useAccount()
  const { writeContractAsync } = useWriteContract();
  console.log('address', address)

  const mint = useCallback(
    async (metadata: Record<string, unknown>) => {
      setLoading(true);
      setError(null);

      try {
        if (!chainId) {
          throw Error('chainId is undefined')
        }

        const rawData = {
          pinataOptions: {
            cidVersion: 1
          },
          pinataMetadata: {
            name: "estate.json"
          },
          pinataContent: metadata
        }

        const data = JSON.stringify(rawData)
        const ipfsResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
          method: "post",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IPFS_PINATA_JWT}`,
            'Content-Type': "application/json"
          },
          body: data,
        });

        const { IpfsHash } = await ipfsResponse.json();
        console.log('IpfsHash', IpfsHash);
        const tokenURI = "ipfs://" + String(IpfsHash)

        // const res = await writeContractAsync({
        //   abi: EstateToken.abi,
        //   address: contracts[chainId].address, // Replace with your contract address
        //   functionName: 'mint',
        //   args: [
        //     address,
        //     tokenURI
        //   ],
        // });
        // console.log("MINT RES", res)
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? '');
        console.log('MINT ERROR', err)

        setLoading(false);
      }
    },
    [address],
  );

  return { mint, loading, error };
};
