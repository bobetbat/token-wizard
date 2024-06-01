import type { NextPage } from 'next';
import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { Layout } from '../components/Layout';

import { MintTokenButton } from '../components/MintToken';

const Home: NextPage = () => {

  return (
    <Layout header footer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='h3'>Mint erc404</Typography>
        <MintTokenButton />
      </Stack>

      <Typography variant='h3'>Offers</Typography>
      <Paper sx={{ p: 2, display: 'flex' }}>
        <Typography>No erc404 owned</Typography>
      </Paper>
    </Layout>
  );
};
export default Home
