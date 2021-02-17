import { FC } from 'react';
import { useContactStore } from '../stores/ContactStore';

export const AppIndexPage: FC = () => {
  const { isEmpty, findAll } = useContactStore();

  return (
    <>
      <h1>Contact List</h1>

      {isEmpty && <p>No Contacts Found</p>}
      {!isEmpty &&
        findAll().map(c => (
          <p>
            {c.name}, {c.phone}, {c.address?.city}
          </p>
        ))}
    </>
  );
};
