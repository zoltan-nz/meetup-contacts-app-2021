import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ContactItem } from '../../components/ContactItem';
import { useContactStore } from '../../stores/ContactStore';

export const ContactPage: FC = () => {
  const { contactId } = useParams<'contactId'>();
  const { isFetched, isLoading, findRecord, isError, is400, is500 } = useContactStore();

  const contact = findRecord(contactId);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isFetched && isError && is500 && <p style={{ color: 'red' }}>500 Error!</p>}
      {isFetched && isError && is400 && <p style={{ color: 'red' }}>400 Error!</p>}
      {isFetched && !isError && !contact && <p>Not a valid ID</p>}
      {isFetched && !isError && contact && <ContactItem contact={contact} />}
    </>
  );
};
