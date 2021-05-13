import { render } from '@testing-library/react';
import { ContactsIndexPage } from './ContactsIndexPage';
jest.mock('../../stores/ContactStore');

describe('./pages/contact/ContactsIndexPage', () => {
  it('should exists', async () => {
    const { debug } = render(<ContactsIndexPage />);
    debug();
  });

  it('should render Loading', async () => {});
});
