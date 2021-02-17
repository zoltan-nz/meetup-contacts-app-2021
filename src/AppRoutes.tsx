import { useRoutes } from 'react-router-dom';
import { AppIndexPage } from './pages/AppIndexPage';
import { AppLayout } from './pages/AppLayout';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppRoutes = () =>
  useRoutes([
    { path: '/', element: <AppLayout />, children: [{ path: '/', element: <AppIndexPage /> }] },
    { path: '*', element: <NotFoundPage /> },
  ]);
