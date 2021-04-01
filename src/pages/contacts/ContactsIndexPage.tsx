import { Button } from '@material-ui/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useContactStore } from '../../stores/ContactStore';

export const ContactsIndexPage: FC = () => {
  const { isEmpty, findAll } = useContactStore();

  return (
    <>
      <h2>Contacts List</h2>
      {isEmpty && <p>No Contacts Found</p>}
      {!isEmpty && (
        <ul>
          {findAll().map(contact => (
            <li key={contact.id}>
              <Link to={contact.id}>{contact.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Button>Hello World</Button>
    </>
  );
};
