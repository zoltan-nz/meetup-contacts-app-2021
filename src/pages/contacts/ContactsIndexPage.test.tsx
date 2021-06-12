import { getByText, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { FC } from 'react';
import { getContacts200, getContacts400, getContacts500 } from '../../mocks/handlers/contacts';
import { server } from '../../mocks/server';
import { ContactStoreProvider } from '../../stores/ContactStore';
import { TestInitializers } from '../../test-utils/TestInitializers';
import { ContactsIndexPage } from './ContactsIndexPage';

describe('ContactsIndexPage', () => {
  let wrapper: FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <TestInitializers>
        <ContactStoreProvider>{children}</ContactStoreProvider>
      </TestInitializers>
    );
  });
  it('should exists', async () => {
    server.use(getContacts200); // Setup mock server response
    const { /* debug, */ getByText } = render(<ContactsIndexPage />, { wrapper });
    // debug(); // Use debug() if you would like to see what was rendered.

    expect(getByText('Contact List')).toBeInTheDocument();
  });

  it('should render Loading', async () => {
    server.use(getContacts200);
    const { getByText } = render(<ContactsIndexPage />, { wrapper });
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render list', async () => {
    server.use(getContacts200);
    const { getByText } = render(<ContactsIndexPage />, { wrapper });
    await waitForElementToBeRemoved(() => getByText('Loading...'));
    expect(getByText('John Smith From Api')).toBeInTheDocument();
  });

  it('should render 500 error component', async () => {
    server.use(getContacts500);
    const { getByText } = render(<ContactsIndexPage />, { wrapper });

    await waitFor(() => expect(getByText('500 Error!')).toBeInTheDocument());
  });

  it('should render 400 error component', async () => {
    server.use(getContacts400);
    const { getByText } = render(<ContactsIndexPage />, { wrapper });

    await waitFor(() => expect(getByText('400 Error!')).toBeInTheDocument());
  });
});
