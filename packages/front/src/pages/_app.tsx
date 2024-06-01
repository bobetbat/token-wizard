import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { config } from '../config/wagmi';
import { store } from '../store'
import theme from '../theme';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: 'https://api.studio.thegraph.com/query/45437/zkestate-rentalnft/v0.0.1',
// });
const client = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <RainbowKitProvider>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
