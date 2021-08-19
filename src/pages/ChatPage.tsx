import { Outlet } from 'react-router-dom';
import { ChatStoreProvider } from '../stores/ChatStore';

export const ChatPage = () => (
  <>
    <h1>Chat Page</h1>
    <ChatStoreProvider>
      <Outlet />
    </ChatStoreProvider>
  </>
);
