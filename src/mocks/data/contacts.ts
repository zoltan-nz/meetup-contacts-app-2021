import { v4 } from 'uuid';
import { Contact } from '../../models/contact';

export const contacts: Contact[] = [
  { id: v4(), fullName: 'John Smith From Api', phone: '1234-1234-1234', address: { city: 'Wellington', zip: 2016 } },
  { id: v4(), fullName: 'Paul Taylor From Api', phone: '2345-3456' },
];
