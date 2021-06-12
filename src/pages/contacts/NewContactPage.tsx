import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Contact } from '../../models/contact';
import { useContactStore } from '../../stores/ContactStore';

export const NewContactPage: FC = () => {
  const navigate = useNavigate();

  const [newContact, setNewContact] = useState<Contact>({ id: v4(), fullName: '', phone: '' });
  const { addRecord, isAddRecordLoading, isAddRecordError, addRecordError } = useContactStore();

  const onSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addRecord(newContact);
      navigate('../');
    } catch {
      return;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="text" onBlur={event => setNewContact({ ...newContact, fullName: event.target.value })} />
      </label>
      <label>
        Phone:
        <input type="text" onBlur={event => setNewContact({ ...newContact, phone: event.target.value })} />
      </label>
      <button type="submit">Add</button>
      {isAddRecordLoading && <div>Saving...</div>}
      {isAddRecordError && <p style={{ color: 'red' }}>{addRecordError?.message}</p>}
    </form>
  );
};
