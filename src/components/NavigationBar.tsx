import { AppBar, Container, Link, Toolbar, Typography, useTheme } from '@material-ui/core';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../AppRoutes';

export const NavigationBar: FC = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="default" elevation={3}>
      <Container>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Contacts App
          </Typography>
          <nav style={{ flexGrow: 1 }}>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to="/"
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Home
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to="/contacts"
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Contacts
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to="/chat"
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Chat
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to="/contacts-with-reducer"
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Contacts With Reducer
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to={ROUTES.advanceContacts}
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Advance contacts
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to="/auth/sign-up"
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Sign Up
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={NavLink}
              to={`${ROUTES.auth}/${ROUTES.login}`}
              sx={{ margin: theme.spacing(1, 1.5), flexGrow: 1 }}
            >
              Login
            </Link>
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
