import { cloneDeep } from 'lodash';
import { FC, Reducer, useReducer } from 'react';

interface NameAndPhone {
  name: string;
  phone: string;
}

interface OurState {
  newContact: NameAndPhone;
  contacts: NameAndPhone[];
}

const initState: OurState = {
  newContact: { name: '', phone: '' },
  contacts: [],
};

enum ActionType {
  CHANGE_NAME = 'UPDATE_NAME',
  CHANGE_PHONE = 'CHANGE_PHONE',
  ADD_CONTACT = 'ADD_CONTACT',
}

type OurAction =
  | {
      type: ActionType.CHANGE_NAME;
      newName: string;
    }
  | {
      type: ActionType.CHANGE_PHONE;
      newPhone: string;
    }
  | {
      type: ActionType.ADD_CONTACT;
    };

// const assertNever = (n: never): never => {
//   throw new Error('Never!!!');
// };

const reducer: Reducer<OurState, OurAction> = (state, action) => {
  const stateCopy = cloneDeep(state);

  switch (action.type) {
    case ActionType.CHANGE_NAME:
      stateCopy.newContact.name = action.newName;
      return stateCopy;
    case ActionType.CHANGE_PHONE:
      stateCopy.newContact.phone = action.newPhone;
      return stateCopy;
    case ActionType.ADD_CONTACT:
      stateCopy.contacts.push(stateCopy.newContact);
      stateCopy.newContact = { name: '', phone: '' };
      return stateCopy;
    default:
      throw new Error('');
    // return assertNever(action.type);
  }
};

export const ContactsWithReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch({ type: ActionType.ADD_CONTACT });
        }}
      >
        <label>
          Name:
          <input
            value={state.newContact.name}
            type="text"
            onChange={event => dispatch({ type: ActionType.CHANGE_NAME, newName: event.target.value })}
          />
        </label>
        <label>
          Phone:
          <input
            value={state.newContact.phone}
            type="text"
            onChange={event => dispatch({ type: ActionType.CHANGE_PHONE, newPhone: event.target.value })}
          />
        </label>
        <button type="submit">Add</button>
      </form>

      <ul>
        {state.contacts.map((c, i) => (
          <li key={i}>
            {c.name}, {c.phone}
          </li>
        ))}
      </ul>
    </>
  );
};
