import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { TokenLaunchForm } from './TokenLaunchForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const ContractTabs: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="contract type tabs">
        <Tab label="ERC20" />
        <Tab label="ERC721" disabled />
        <Tab label="ERC1155" disabled />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TokenLaunchForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>ERC721</Typography>
        {/* Insert your ERC721 form component here */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>ERC1155</Typography>
        {/* Insert your ERC1155 form component here */}
      </TabPanel>
    </Box>
  );
};


