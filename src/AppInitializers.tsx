import { StrictMode, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ContactStoreProvider } from './stores/ContactStore';

export const AppInitializers: FC = ({ children }) => (
  <StrictMode>
    <BrowserRouter>
      <ContactStoreProvider>{children}</ContactStoreProvider>
    </BrowserRouter>
  </StrictMode>
);
