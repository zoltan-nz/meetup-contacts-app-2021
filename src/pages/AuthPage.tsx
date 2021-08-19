import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { ChangeEvent, FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useFirebaseService } from '../services/FirebaseService';

export const AuthPage: FC = () => {
  const { isFirebaseConnected, connectFirebase, disconnectFirebase } = useFirebaseService();
  const [toggleFirebase, setToggleFirebase] = useState(false);

  const handleToggleFirebase = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setToggleFirebase(event.target.checked);

    event.target.checked ? connectFirebase() : disconnectFirebase();
  };
  return (
    <>
      <h1>Auth Page</h1>

      <FormControlLabel
        control={<Switch onChange={handleToggleFirebase} checked={toggleFirebase} />}
        label="Firebase Connection"
      />

      {!isFirebaseConnected && (
        <Box sx={{ fontSize: 'default' }}>
          You can turn on Firebase if you added the Firebase config to .env.local. Please check the README.
        </Box>
      )}

      {isFirebaseConnected && <Outlet />}
    </>
  );
};
