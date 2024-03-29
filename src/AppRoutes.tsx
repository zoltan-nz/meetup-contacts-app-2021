import { useRoutes } from 'react-router-dom';
import { AdvanceContactsPage } from './pages/AdvanceContactsPage';
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

export const ROUTES = {
  advanceContacts: 'advance-contacts',
  contactsWithReducer: 'contacts-with-reducer',
  auth: 'auth',
  login: 'login',
};

export const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayoutPage />,
      children: [
        { index: true, element: <AppIndexPage /> },
        { path: 'contacts-with-reducer', element: <ContactsWithReducer /> },
        { path: ROUTES.advanceContacts, element: <AdvanceContactsPage /> },
        {
          path: 'contacts',
          element: <ContactsPage />,
          children: [
            { index: true, element: <ContactsIndexPage /> },
            { path: ':contactId', element: <ContactPage /> },
            { path: 'new', element: <NewContactPage /> },
          ],
        },
        {
          path: 'chat',
          element: <ChatPage />,
          children: [{ index: true, element: <ChatIndexPage /> }],
        },
        {
          path: 'auth',
          element: <AuthPage />,
          children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
