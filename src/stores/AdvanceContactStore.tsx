import { cloneDeep } from 'lodash';
import { createContext, Dispatch, FC, Reducer, useContext, useReducer } from 'react';

type AdvanceContactStore = AdvanceContactStoreState;
type AdvanceContactStoreDispatch = Dispatch<AdvanceContactStoreAction>;

const AdvanceContactStoreContext = createContext<AdvanceContactStore | undefined>(undefined);
const AdvanceContactStoreDispatchContext = createContext<AdvanceContactStoreDispatch | undefined>(undefined);

export const useAdvanceContactStore = () => {
  const context = useContext(AdvanceContactStoreContext);
  if (context === undefined) {
    throw new Error('useAdvanceContactStoreContext must be used within a AdvanceContactStoreProvider');
  }
  return context;
};

export const useAdvanceContactStoreDispatch = () => {
  const context = useContext(AdvanceContactStoreDispatchContext);
  if (context === undefined) {
    throw new Error('useAdvanceContactStoreDispatchContext must be used within a AdvanceContactStoreProvider');
  }
  return context;
};

interface Contact {
  name: string;
  phone: string;
}

interface AdvanceContactStoreState {
  contacts: Contact[];
}

const initState: AdvanceContactStoreState = {
  contacts: [],
};

export enum AdvanceContactStoreActionType {
  ADD_CONTACT = 'ADD_CONTACT',
}

type AdvanceContactStoreAction = {
  type: AdvanceContactStoreActionType.ADD_CONTACT;
  newContact: Contact;
};

const reducer: Reducer<AdvanceContactStoreState, AdvanceContactStoreAction> = (state, action) => {
  const stateCopy = cloneDeep(state);

  switch (action.type) {
    case AdvanceContactStoreActionType.ADD_CONTACT:
      stateCopy.contacts.push({ name: action.newContact.name, phone: action.newContact.phone });
      return stateCopy;
    default:
      throw new Error('');
  }
};

export const AdvanceContactStoreProvider: FC = ({ children }) => {
  const [contacts, dispatch] = useReducer(reducer, initState);

  return (
    <AdvanceContactStoreContext.Provider value={contacts}>
      <AdvanceContactStoreDispatchContext.Provider value={dispatch}>
        {children}
      </AdvanceContactStoreDispatchContext.Provider>
    </AdvanceContactStoreContext.Provider>
  );
};
