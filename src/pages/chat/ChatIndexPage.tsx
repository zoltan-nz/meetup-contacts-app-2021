import firebase from 'firebase';
import { FormEventHandler, useEffect, useState } from 'react';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

interface Message {
  id: string;
  text: string;
}

interface User {
  name: string;
}

interface ChatMessage {
  id?: string;
  user: User;
  message: string;
  time: Date | string;
}

const messagesDb = firebase.database().ref('messagesV2');
const pushChatMessage = (message: ChatMessage) => messagesDb.push(message);

export const ChatIndexPage = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  const serializeMessageList = (snapshot: firebase.database.DataSnapshot) => {
    const rawDbDataAsObject = snapshot.val() ?? [];
    const rawDbDataAsArray = Object.entries<ChatMessage>(rawDbDataAsObject);

    const serializedList: ChatMessage[] = rawDbDataAsArray.map<ChatMessage>(([id, rawChatMessage]) => ({
      id,
      message: rawChatMessage.message,
      user: rawChatMessage.user,
      time: rawChatMessage.time,
    }));

    setMessageList(serializedList);
  };

  const submitMessage: FormEventHandler = event => {
    event.preventDefault();
    pushChatMessage({ message: newMessage, time: new Date().toISOString(), user: { name: 'Alen' } });
    setNewMessage('');
  };

  // Init call, empty array as dependency means, this function will be called when page rendered.
  useEffect(() => {
    const onValueChange = messagesDb.on('value', serializeMessageList); // Listen to database change
    return () => {
      messagesDb.off('value', onValueChange); // Unsubscribe when user navigate away from this page
    };
  }, []);

  return (
    <>
      <h2>Chat Index Page</h2>
      <form onSubmit={submitMessage}>
        <input type="text" value={newMessage} onChange={event => setNewMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messageList.map(message => (
          <li key={message.id}>
            ({message.id}) {message.user.name} - {message.time}: {message.message}
          </li>
        ))}
      </ul>
    </>
  );
};
