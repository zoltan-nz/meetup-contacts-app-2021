import { createContext, FC, useContext } from 'react';
import { v4 } from 'uuid';
import { Contact } from '../models/contact';

const contacts: Contact[] = [
  { id: v4(), name: 'John Smith', phone: '1234-1234-1234', address: { city: 'Wellington', zip: 2016 } },
  { id: v4(), name: 'Paul Taylor', phone: '2345-3456' },
];

interface ContactStore {
  findAll: () => Contact[];
  findRecord: (id: string) => Contact | undefined;
  addRecord: (contact: Contact) => number;
  isEmpty: boolean;
}

const ContactStoreContext = createContext<ContactStore | undefined>(undefined);

export const useContactStore = () => {
  const contactStoreContext = useContext(ContactStoreContext);

  if (!contactStoreContext) {
    throw new Error('useContactStore must be used within ContactStoreProvider');
  }

  return contactStoreContext;
};

export const ContactStoreProvider: FC = ({ children }) => {
  const findAll = () => contacts;
  const findRecord = (id: string) => contacts.find(c => c.id === id);
  const addRecord = (contact: Contact) => contacts.push(contact);
  const isEmpty = contacts.length === 0;

  return (
    <ContactStoreContext.Provider value={{ findAll, findRecord, addRecord, isEmpty }}>
      {children}
    </ContactStoreContext.Provider>
  );
};
