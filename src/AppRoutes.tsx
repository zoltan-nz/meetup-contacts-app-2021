import { useRoutes } from 'react-router-dom';
import { AppIndexPage } from './pages/AppIndexPage';
import { AppLayoutPage } from './pages/AppLayoutPage';
import { ContactPage } from './pages/contacts/ContactPage';
import { ContactsIndexPage } from './pages/contacts/ContactsIndexPage';
import { NewContactPage } from './pages/contacts/NewContactPage';
import { ContactsPage } from './pages/ContactsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayoutPage />,
      children: [
        { path: '/', element: <AppIndexPage /> },
        {
          path: '/contacts',
          element: <ContactsPage />,
          children: [
            { path: '/', element: <ContactsIndexPage /> },
            { path: '/:contactId', element: <ContactPage /> },
            { path: '/new', element: <NewContactPage /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
