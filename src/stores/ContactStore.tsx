import axios from 'axios';
import { createContext, FC, useContext } from 'react';
import { useQuery } from 'react-query';
import { Contact, ContactResponse } from '../models/contact';

// const contacts: Contact[] = [
//   { id: v4(), name: 'John Smith', phone: '1234-1234-1234', address: { city: 'Wellington', zip: 2016 } },
//   { id: v4(), name: 'Paul Taylor', phone: '2345-3456' },
// ];

interface ContactStore {
  findAll: () => Contact[] | undefined;
  findRecord: (id: string) => Contact | undefined;
  addRecord: (contact: Contact) => void;
  isEmpty: boolean;
  isLoading: boolean;
  isFetched: boolean;
  error?: unknown;
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
  const { data: response, error, isLoading, isFetched } = useQuery('contacts', () =>
    axios.get<ContactResponse>('/api/contacts')
  );

  const contacts = response?.data.contacts;
  const findAll = () => response?.data.contacts;
  const findRecord = (id: string) => contacts?.find(c => c.id === id);
  const addRecord = (contact: Contact) => {};
  const isEmpty = contacts?.length === 0;

  return (
    <ContactStoreContext.Provider value={{ findAll, findRecord, addRecord, isEmpty, isLoading, isFetched, error }}>
      {children}
    </ContactStoreContext.Provider>
  );
};
