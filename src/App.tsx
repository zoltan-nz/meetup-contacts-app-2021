import { FC } from 'react';
import { AppInitializers } from './AppInitializers';
import { AppRoutes } from './AppRoutes';

export const App: FC = () => (
  <AppInitializers>
    <AppRoutes />
  </AppInitializers>
);
