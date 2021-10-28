import { FC, useState } from 'react';
import {
  AdvanceContactStoreActionType,
  useAdvanceContactStore,
  useAdvanceContactStoreDispatch,
} from '../stores/AdvanceContactStore';

export const AdvanceContactsPage: FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useAdvanceContactStoreDispatch();
  const { contacts } = useAdvanceContactStore();

  return (
    <>
      <h1>Advance Contacts</h1>

      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch({
            type: AdvanceContactStoreActionType.ADD_CONTACT,
            newContact: {
              name,
              phone,
            },
          });
        }}
      >
        <label>
          Name:
          <input
            value={name}
            type="text"
            onChange={event => {
              setName(event.target.value);
            }}
          />
        </label>
        <label>
          Phone:
          <input
            value={phone}
            type="text"
            onChange={event => {
              setPhone(event.target.value);
            }}
          />
        </label>
        <button type="submit">Add</button>
      </form>

      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.phone}
          </li>
        ))}
      </ul>
    </>
  );
};
