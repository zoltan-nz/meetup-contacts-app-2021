import { CssBaseline } from '@material-ui/core';
import { FC, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseServiceProvider } from './services/FirebaseService';
import { AdvanceContactStoreProvider } from './stores/AdvanceContactStore';
import { ContactStoreProvider } from './stores/ContactStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppInitializers: FC = ({ children }) => (
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContactStoreProvider>
          <AdvanceContactStoreProvider>
            <FirebaseServiceProvider>{children}</FirebaseServiceProvider>
          </AdvanceContactStoreProvider>
        </ContactStoreProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
