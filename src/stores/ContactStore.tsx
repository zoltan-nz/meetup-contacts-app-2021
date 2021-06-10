import axios, { AxiosResponse } from 'axios';
import { createContext, FC, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Contact, ContactResponse } from '../models/contact';

// const contacts: Contact[] = [
//   { id: v4(), name: 'John Smith', phone: '1234-1234-1234', address: { city: 'Wellington', zip: 2016 } },
//   { id: v4(), name: 'Paul Taylor', phone: '2345-3456' },
// ];

interface ContactStore {
  findAll: () => Contact[];
  findRecord: (id: string) => Contact | undefined;
  addRecord: (contact: Contact) => Promise<AxiosResponse<Contact>>;
  isEmpty: boolean;
  isLoading: boolean;
  isFetched: boolean;
  error?: unknown;
  isAddRecordLoading: boolean;
  isAddRecordError: boolean;
  isAddRecordSuccess: boolean;
  isError: boolean;
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
  const queryClient = useQueryClient();
  const {
    data: response,
    isError,
    error,
    isLoading,
    isFetched,
    refetch,
  } = useQuery('contacts', () => axios.get<ContactResponse>('/api/contacts'));

  const {
    mutateAsync,
    isLoading: isAddRecordLoading,
    isError: isAddRecordError,
    isSuccess: isAddRecordSuccess,
  } = useMutation((contact: Contact) => axios.post('/api/contacts', { contact }), {
    onSuccess: () => {
      queryClient.invalidateQueries('contacts');
    },
  });

  const contacts = response?.data.contacts;
  const findAll = () => response?.data.contacts || [];
  const findRecord = (id: string) => contacts?.find(c => c.id === id);
  const addRecord = async (contact: Contact) => {
    const nwcntct = await mutateAsync(contact);
    refetch();
    return nwcntct;
  };

  const isEmpty = contacts?.length === 0;

  return (
    <ContactStoreContext.Provider
      value={{
        findAll,
        findRecord,
        addRecord,
        isError,
        isEmpty,
        isLoading,
        isFetched,
        error,
        isAddRecordError,
        isAddRecordLoading,
        isAddRecordSuccess,
      }}
    >
      {children}
    </ContactStoreContext.Provider>
  );
};
