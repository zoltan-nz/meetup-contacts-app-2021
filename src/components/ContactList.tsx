import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../models/contact';

interface ContactListParams {
  contacts: Contact[];
}

export const ContactList: FC<ContactListParams> = ({ contacts }) => (
  <ul>
    {contacts.map(contact => (
      <li key={contact.id}>
        <Link to={contact.id}>{contact.fullName}</Link>
      </li>
    ))}
  </ul>
);
