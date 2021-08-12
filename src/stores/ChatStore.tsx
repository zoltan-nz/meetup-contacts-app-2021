import firebase from 'firebase/compat';
import { createContext, FC, useContext, useMemo, useState } from 'react';
import { ChatMessage } from '../models/chat-message';
import { useFirebaseService } from '../services/FirebaseService';

const CHAT_MESSAGES_DB = 'chat-messages';

/**
 * Chat Store demonstrates the usage of Firebase realtime data store.
 * Firebase connection is managed in FirebaseService, check it out.
 */
interface ChatStore {
  saveChatMessage: (message: string) => void;
  chatMessages: ChatMessage[];
}

const ChatStoreContext = createContext<ChatStore | undefined>(undefined);

export const useChatStore = () => {
  const chatStoreContext = useContext(ChatStoreContext);

  if (!chatStoreContext) {
    throw new Error('useChatStore must be used within ChatStoreProvider');
  }

  return chatStoreContext;
};

export const ChatStoreProvider: FC = ({ children }) => {
  const { firebaseApp } = useFirebaseService();

  const [chatMessagesCollection, setChatMessagesCollection] = useState<firebase.database.Reference | undefined>(
    undefined
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useMemo(() => {
    setChatMessagesCollection(firebaseApp?.database().ref(CHAT_MESSAGES_DB));
  }, [firebaseApp]);

  const serializeMessageList = (snapshot: firebase.database.DataSnapshot) => {
    const rawDbDataAsObject = snapshot.val() ?? [];
    const rawDbDataAsArray = Object.entries<ChatMessage>(rawDbDataAsObject);

    const serializedList: ChatMessage[] = rawDbDataAsArray.map<ChatMessage>(([id, rawChatMessage]) => ({
      id,
      message: rawChatMessage.message,
      user: rawChatMessage.user,
      time: rawChatMessage.time,
    }));

    setChatMessages(serializedList);
  };

  const saveChatMessage = (message: string) => {
    chatMessagesCollection?.push({ message, time: new Date().toISOString(), user: { name: 'Alen' } });
  };

  useMemo(() => {
    chatMessagesCollection?.on('value', serializeMessageList); // Listen to database change
  }, [chatMessagesCollection]);

  return (
    <ChatStoreContext.Provider
      value={{
        saveChatMessage,
        chatMessages,
      }}
    >
      {children}
    </ChatStoreContext.Provider>
  );
};
