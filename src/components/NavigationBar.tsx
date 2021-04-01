import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NavigationBar: FC = () => (
  <AppBar>
    <Toolbar>
      <Typography variant='h6'>Contacts App</Typography>
      <nav>
        <Link variant='button' color="textPrimary" component={NavLink} to="/">Home</Link>
        <Link variant='button'>Contacts</Link>
      </nav>
      <NavLink to="/">Home</NavLink> | <NavLink to="/contacts">Contacts</NavLink>
    </Toolbar>
  </AppBar>
);
