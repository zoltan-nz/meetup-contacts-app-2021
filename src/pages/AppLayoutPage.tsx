import { Container } from '@material-ui/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

export const AppLayoutPage: FC = () => (
  <>
    <NavigationBar />
    <Container>
      <Outlet />
    </Container>
  </>
);
