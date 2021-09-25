import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { contacts } from '../../mocks/data/contacts';
import { getContacts200 } from '../../mocks/handlers/contacts';
import { server } from '../../mocks/server';
import { ContactStoreProvider } from '../../stores/ContactStore';
import { TestInitializers } from '../../test-utils/TestInitializers';
import { ContactPage } from './ContactPage';

describe('ContactItem Page', () => {
  describe('With rebuilding the expected route in the wrapper', () => {
    let wrapper: FC;
    let contactId: string;

    beforeEach(() => {
      contactId = contacts[0].id;

      wrapper = ({ children }) => (
        <TestInitializers initialEntries={[`/contacts/${contactId}`]}>
          <ContactStoreProvider>
            <Routes>
              <Route path="/contacts/:contactId" element={<ContactPage />} />
            </Routes>
          </ContactStoreProvider>
        </TestInitializers>
      );
    });

    it('should render the contact item', async () => {
      server.use(getContacts200); // Setup mock server response

      const { getByText } = render(<></>, { wrapper });
      await waitForElementToBeRemoved(() => getByText('Loading...'));
      expect(getByText('John Smith From Api')).toBeInTheDocument();
    });
  });
});
