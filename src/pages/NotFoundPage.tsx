import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC = () => (
  <>
    <h1>Page not found</h1>
    <p>
      Back to <Link to="/">Home Page</Link>
    </p>
  </>
);
