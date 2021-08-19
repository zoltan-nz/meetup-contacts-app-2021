import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useFirebaseService } from '../../services/FirebaseService';
import { useChatStore } from '../../stores/ChatStore';

export const ChatIndexPage = () => {
  const { firebaseApp, isFirebaseConnected, connectFirebase, disconnectFirebase } = useFirebaseService();
  const [toggleFirebase, setToggleFirebase] = useState(false);

  const [newMessage, setNewMessage] = useState('');
  const { chatMessages, saveChatMessage } = useChatStore();

  const sendMessage: FormEventHandler = event => {
    event.preventDefault();
    saveChatMessage(newMessage);
    setNewMessage('');
  };

  const handleToggleFirebase = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setToggleFirebase(event.target.checked);

    event.target.checked ? connectFirebase() : disconnectFirebase();
  };

  return (
    <>
      <h2>Chat Index Page</h2>

      <FormControlLabel
        control={<Switch onChange={handleToggleFirebase} checked={toggleFirebase} />}
        label="Firebase Connection"
      />

      {!isFirebaseConnected && (
        <Box sx={{ fontSize: 'default' }}>
          You can turn on Firebase if you added the Firebase config to .env.local. Please check the README.
        </Box>
      )}

      {isFirebaseConnected && firebaseApp?.auth().currentUser && (
        <>
          <form onSubmit={sendMessage}>
            <input type="text" value={newMessage} onChange={event => setNewMessage(event.target.value)} />
            <button type="submit">Send</button>
          </form>
          <ul>
            {chatMessages.map(message => (
              <li key={message.id}>
                ({message.id}) {message.user.name} - {message.time}: {message.message}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
