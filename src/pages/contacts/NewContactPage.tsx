import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Contact } from '../../models/contact';
import { useContactStore } from '../../stores/ContactStore';

export const NewContactPage: FC = () => {
  const [newContact, setNewContact] = useState<Contact>({ id: v4(), name: '', phone: '' });
  const { addRecord } = useContactStore();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();

    addRecord(newContact);
    navigate('../');
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="text" onBlur={event => setNewContact({ ...newContact, name: event.target.value })} />
      </label>
      <label>
        Phone:
        <input type="text" onBlur={event => setNewContact({ ...newContact, phone: event.target.value })} />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};
