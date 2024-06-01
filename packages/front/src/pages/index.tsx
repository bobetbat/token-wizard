import type { NextPage } from 'next';
import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { Layout } from '../components/Layout';

import { MintTokenButton } from '../components/MintToken';
import { TokenLaunchForm } from '../components/TokenForm';

const Home: NextPage = () => {

  return (
    <Layout header footer>
      <Paper sx={{ p: 2, display: 'flex' }}>
        <TokenLaunchForm />
      </Paper>
    </Layout>
  );
};
export default Home
