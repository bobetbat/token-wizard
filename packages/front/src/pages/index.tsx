import type { NextPage } from 'next';
import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { Layout } from '../components/Layout';

import { ContractTabs } from '../components/ContractTabs';

const Home: NextPage = () => {

  return (
    <Layout header footer>
      <Paper sx={{ p: 2, display: 'flex' }}>
        <ContractTabs />
      </Paper>
    </Layout>
  );
};
export default Home
