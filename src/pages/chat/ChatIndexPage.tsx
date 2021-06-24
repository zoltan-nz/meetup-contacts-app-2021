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

const messagesDb = firebase.database().ref('messages');
const pushMessage = (message: string) => messagesDb.push(message);

export const ChatIndexPage = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<Message[]>([]);

  const serializeMessageList = (snapshot: firebase.database.DataSnapshot) => {
    const rawDbDataAsObject = snapshot.val();
    const rawDbDataAsArray = Object.entries<string>(rawDbDataAsObject);

    const serializedList: Message[] = rawDbDataAsArray.map<Message>(([id, text]) => ({
      id,
      text,
    }));

    setMessageList(serializedList);
  };

  const submitMessage: FormEventHandler = event => {
    event.preventDefault();
    pushMessage(newMessage);
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
            {message.id}: {message.text}
          </li>
        ))}
      </ul>
    </>
  );
};
