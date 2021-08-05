import { Outlet } from 'react-router-dom';
import { FirebaseServiceProvider } from '../services/FirebaseService';
import { ChatStoreProvider } from '../stores/ChatStore';

export const ChatPage = () => (
  <>
    <h1>Chat Page</h1>
    <FirebaseServiceProvider>
      <ChatStoreProvider>
        <Outlet />
      </ChatStoreProvider>
    </FirebaseServiceProvider>
  </>
);
