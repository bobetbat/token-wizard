import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useMintToken } from '../hooks/useMintToken';

const testUrl = { url: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' }

export const MintTokenButton: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const { mint, loading, error } = useMintToken()

  const handleMint = async (object: Record<string, any> = testUrl) => {
    try {
      setUploading(true);

      // const data = new FormData();
      // console.log('data', data)
      // // TODO: change empty blob to 3d object
      // data.append("file", new Blob());

      const mintData = await mint(object);

      setUploading(false);
      console.log('mintData', mintData);

    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <Button variant='contained' size='large' onClick={handleMint}>Mint</Button>
  )
}


