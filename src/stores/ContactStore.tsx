import axios, { AxiosError, AxiosResponse } from 'axios';
import { createContext, FC, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Contact, ContactsResponse } from '../models/contact';

export const CONTACTS_API_URL = '/api/contacts/';

const CONTACTS_QUERY_KEY = 'contacts';

interface ContactStore {
  findAll: () => Contact[];
  findRecord: (id: string | undefined) => Contact | undefined;
  isEmpty: boolean;
  isLoading: boolean;
  isFetched: boolean;
  isError: boolean;
  is500: boolean;
  is400: boolean;
  error: AxiosError | null;

  addRecord: (contact: Contact) => Promise<AxiosResponse<Contact> | AxiosError>;
  isAddRecordLoading: boolean;
  isAddRecordError: boolean;
  isAddRecordSuccess: boolean;
  addRecordError: AxiosError | null;
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
  } = useQuery<AxiosResponse, AxiosError, AxiosResponse<ContactsResponse>>(
    CONTACTS_QUERY_KEY,
    async () => await axios.get(CONTACTS_API_URL)
  );

  const {
    mutateAsync,
    isLoading: isAddRecordLoading,
    isError: isAddRecordError,
    isSuccess: isAddRecordSuccess,
    error: addRecordError,
  } = useMutation<AxiosResponse, AxiosError, Contact>(
    async (contact: Contact) => await axios.post(CONTACTS_API_URL, { contact }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(CONTACTS_QUERY_KEY);
      },
    }
  );

  const contacts = response?.data.contacts;
  const isEmpty = contacts?.length === 0;

  const findAll = () => response?.data.contacts || [];
  const findRecord = (id: string | undefined) => contacts?.find(c => c.id === id);

  const addRecord = async (contact: Contact) => {
    const newContact = await mutateAsync(contact);
    await refetch();
    return newContact;
  };

  const is400 = error?.response?.status === 400;
  const is500 = error?.response?.status === 500;

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
        is500,
        is400,
        addRecordError,
      }}
    >
      {children}
    </ContactStoreContext.Provider>
  );
};
