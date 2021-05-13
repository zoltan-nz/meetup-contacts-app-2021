import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useContactStore } from '../../stores/ContactStore';

export const ContactsIndexPage: FC = () => {
  const { isEmpty, findAll, isFetched, isLoading, error } = useContactStore();

  return (
    <>
      <h2>Contacts List</h2>
      {isLoading && <p>Loading...</p>}
      {isFetched && isEmpty && <p>No Contacts Found</p>}
      {isFetched && !isEmpty && (
        <ul>
          {findAll()?.map(contact => (
            <li key={contact.id}>
              <Link to={contact.id}>{contact.fullName}</Link>
            </li>
          ))}
        </ul>
      )}
      {isFetched && error && <p>Hooops...</p>}
    </>
  );
};
