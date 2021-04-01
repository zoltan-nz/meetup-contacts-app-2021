import { Container } from '@material-ui/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

export const AppLayout: FC = () => (
  <>
    <NavigationBar />
    <Container>
      <Outlet />
    </Container>
  </>
);
