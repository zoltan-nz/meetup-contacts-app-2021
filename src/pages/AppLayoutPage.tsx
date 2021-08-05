import { Container } from '@material-ui/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { useRenderCounter } from '../hooks/use-render-counter';

export const AppLayoutPage: FC = () => {
  const renderCounter = useRenderCounter();

  return (
    <>
      <div style={{ zIndex: 9 }}>{renderCounter}</div>
      <NavigationBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
