import { FC } from 'react';
import { ContactList } from '../../components/ContactList';
import { useContactStore } from '../../stores/ContactStore';

export const ContactsIndexPage: FC = () => {
  const { isEmpty, findAll, isFetched, isLoading, isError } = useContactStore();

  return (
    <>
      <h2>Contact List</h2>
      {isLoading && <p>Loading...</p>}
      {isFetched && isError && <p>Hooops...!</p>}
      {isFetched && !isError && isEmpty && <p>No Contacts Found</p>}
      {isFetched && !isError && !isEmpty && <ContactList contacts={findAll()} />}
    </>
  );
};
