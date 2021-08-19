import { useRoutes } from 'react-router-dom';
import { AppIndexPage } from './pages/AppIndexPage';
import { AppLayoutPage } from './pages/AppLayoutPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { AuthPage } from './pages/AuthPage';
import { ChatIndexPage } from './pages/chat/ChatIndexPage';
import { ChatPage } from './pages/ChatPage';
import { ContactPage } from './pages/contacts/ContactPage';
import { ContactsIndexPage } from './pages/contacts/ContactsIndexPage';
import { NewContactPage } from './pages/contacts/NewContactPage';
import { ContactsPage } from './pages/ContactsPage';
import { ContactsWithReducer } from './pages/ContactsWithReducer';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayoutPage />,
      children: [
        { path: '/', element: <AppIndexPage /> },
        { path: '/contacts-with-reducer', element: <ContactsWithReducer /> },
        {
          path: '/contacts',
          element: <ContactsPage />,
          children: [
            { path: '/', element: <ContactsIndexPage /> },
            { path: '/:contactId', element: <ContactPage /> },
            { path: '/new', element: <NewContactPage /> },
          ],
        },
        {
          path: '/chat',
          element: <ChatPage />,
          children: [{ path: '/', element: <ChatIndexPage /> }],
        },
        {
          path: '/auth',
          element: <AuthPage />,
          children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/sign-up', element: <SignUpPage /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
