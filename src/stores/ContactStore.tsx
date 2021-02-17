import { createContext, FC, useContext } from 'react';
import { Contact } from '../models/contact';

const contacts: Contact[] = [
  // {name: 'John Smith', phone: '1234-1234-1234', address: {city: 'Wellington', zip: 2016}},
  // {name: 'Paul Taylor', phone: '2345-3456'}
];

interface ContactStore {
  findAll: () => Contact[];
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
  const isEmpty = contacts.length === 0;

  return <ContactStoreContext.Provider value={{ findAll, isEmpty }}>{children}</ContactStoreContext.Provider>;
};
