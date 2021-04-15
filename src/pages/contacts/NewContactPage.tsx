import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Contact } from '../../models/contact';
import { useContactStore } from '../../stores/ContactStore';

export const NewContactPage: FC = () => {
  const [newContact, setNewContact] = useState<Contact>({ id: v4(), fullName: '', phone: '' });
  const { addRecord, isAddRecordLoading } = useContactStore();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    addRecord(newContact).then(response => console.log(response));
    navigate('../');
  };

  // useEffect(() => {
  //     if (isAddRecordSuccess) {
  //       navigate('../');
  //     }
  //   }, [isAddRecordSuccess, navigate]);

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
    </form>
  );
};
