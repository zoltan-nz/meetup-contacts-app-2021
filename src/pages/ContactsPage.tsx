import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const ContactsPage: FC = () => (
  <>
    <h1>Contacts Page</h1>
    <NavLink to="/contacts">List</NavLink> | <NavLink to="/contacts/new">Create</NavLink>
    <Outlet />
  </>
);
