import { FC } from 'react';
import { Contact } from '../models/contact';

export interface ContactParam {
  contact: Contact;
}

export const ContactItem: FC<ContactParam> = ({ children, contact }) => (
  <>
    <h2>{contact.fullName}</h2>
    <ul>
      <li>Phone: {contact.phone}</li>
      <li>
        Address: {contact.address?.city}, {contact.address?.zip}
      </li>
    </ul>
  </>
);
