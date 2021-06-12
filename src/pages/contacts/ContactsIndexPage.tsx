import { FC } from 'react';
import { ContactList } from '../../components/ContactList';
import { useContactStore } from '../../stores/ContactStore';

export const ContactsIndexPage: FC = () => {
  const { isEmpty, findAll, isFetched, isLoading, isError, is500, is400 } = useContactStore();

  return (
    <>
      <h2>Contact List</h2>
      {isLoading && <p>Loading...</p>}
      {isFetched && isError && is500 && <p style={{ color: 'red' }}>500 Error!</p>}
      {isFetched && isError && is400 && <p style={{ color: 'red' }}>400 Error!</p>}
      {isFetched && !isError && isEmpty && <p>No Contacts Found</p>}
      {isFetched && !isError && !isEmpty && <ContactList contacts={findAll()} />}
    </>
  );
};
