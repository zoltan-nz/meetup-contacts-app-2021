import firebase from 'firebase/compat';
import { createContext, FC, useContext, useMemo, useState } from 'react';

/**
 * Firebase Service is for connecting to Firebase.
 */
interface FirebaseService {
  firebaseApp: firebase.app.App | undefined;
  isFirebaseConnected: boolean;
  connectFirebase: () => boolean;
  disconnectFirebase: () => void;
}

/*
Add values from your Firebase console to `.env.local` files. Values will be imported during build time.
1. Navigate to console.firebase.google.com
2. Create or open your Project
3. Find Project settings with clicking on the cog icon.
4. Find "SDK setup and configuration" section and click on "Config"
*/
const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const FirebaseServiceContext = createContext<FirebaseService | undefined>(undefined);

export const useFirebaseService = () => {
  const firebaseServiceContext = useContext(FirebaseServiceContext);

  if (!firebaseServiceContext) {
    throw new Error('useFirebaseService must be used within FirebaseServiceProvider');
  }

  return firebaseServiceContext;
};

export const FirebaseServiceProvider: FC = ({ children }) => {
  // Initialized Firebase connection will be added to the firebaseApp
  const [firebaseApp, setFirebaseApp] = useState<firebase.app.App | undefined>(undefined);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  useMemo(() => {
    setIsFirebaseConnected(firebaseApp !== undefined);
  }, [firebaseApp, setIsFirebaseConnected]);

  const connectFirebase = () => {
    if (!FIREBASE_CONFIG.databaseURL) {
      console.error("Please don't forget to setup Firebase config in .env.local");
      return false;
    }

    const firebaseInstance = firebase.initializeApp(FIREBASE_CONFIG);
    setFirebaseApp(firebaseInstance);
    return true;
  };

  const disconnectFirebase = () => {
    setFirebaseApp(undefined);
  };

  return (
    <FirebaseServiceContext.Provider
      value={{
        firebaseApp,
        isFirebaseConnected,
        connectFirebase,
        disconnectFirebase,
      }}
    >
      {children}
    </FirebaseServiceContext.Provider>
  );
};
