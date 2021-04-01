import { CssBaseline } from '@material-ui/core';
import { FC, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { ContactStoreProvider } from './stores/ContactStore';

const queryClient = new QueryClient();

export const AppInitializers: FC = ({ children }) => (
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContactStoreProvider>{children}</ContactStoreProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
