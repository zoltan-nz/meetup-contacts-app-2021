import firebase from 'firebase/compat';
import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { User } from '../../models/user';

export const SignUpPage: FC = () => {
  const [newUser, setNewUser] = useState<User>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!newUser.email || !newUser.password) return;

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
      console.log(userCredential);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input type="email" onBlur={event => setNewUser({ ...newUser, email: event.target.value })} />
        </label>
        <label>
          Password:
          <input type="password" onBlur={event => setNewUser({ ...newUser, password: event.target.value })} />
        </label>
        <button type="submit">Sign Up</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </>
  );
};
