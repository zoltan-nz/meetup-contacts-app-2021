import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useContactStore } from '../../stores/ContactStore';

export const ContactPage: FC = () => {
  const { contactId } = useParams();
  const { findRecord } = useContactStore();

  const contact = findRecord(contactId);

  return contact ? (
    <>
      <h2>{contact?.fullName}</h2>
      <ul>
        <li>Phone: {contact?.phone}</li>
        <li>
          Address: {contact?.address?.city}, {contact?.address?.zip}
        </li>
      </ul>
    </>
  ) : (
    <div>Not a valid ID</div>
  );
};
