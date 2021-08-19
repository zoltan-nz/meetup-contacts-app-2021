import firebase from 'firebase/compat';
import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { User } from '../../models/user';

export const LoginPage: FC = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!user.email || !user.password) return;

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
      console.log(userCredential);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input type="email" onBlur={event => setUser({ ...user, email: event.target.value })} />
        </label>
        <label>
          Password:
          <input type="password" onBlur={event => setUser({ ...user, password: event.target.value })} />
        </label>
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </>
  );
};
