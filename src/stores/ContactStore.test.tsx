import { renderHook } from '@testing-library/react-hooks/pure';
import { FC } from 'react';
import { getContacts200, getContacts400, getContacts500, getContactsEmpty200 } from '../mocks/handlers/contacts';
import { server } from '../mocks/server';
import { TestInitializers } from '../test-utils/TestInitializers';
import { ContactStoreProvider, useContactStore } from './ContactStore';

describe('ContactStore', () => {
  let wrapper: FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <TestInitializers>
        <ContactStoreProvider>{children}</ContactStoreProvider>
      </TestInitializers>
    );
  });

  it('should raise an error without Provider', () => {
    server.use(getContacts200);
    const { result } = renderHook(() => useContactStore());
    expect(result.error).toEqual(Error('useContactStore must be used within ContactStoreProvider'));
  });

  it('runs without error if wrapped in Provider', () => {
    server.use(getContacts200);
    const { result } = renderHook(() => useContactStore(), { wrapper });
    expect(result.error).toBeFalsy();
  });

  it('can download data', async () => {
    server.use(getContacts200);
    const { result, waitForNextUpdate } = renderHook(() => useContactStore(), { wrapper });
    await waitForNextUpdate();

    expect(result.current.findAll()?.length).toBe(2);
  });

  test('isEmpty', async () => {
    server.use(getContactsEmpty200);
    const { result, waitForNextUpdate } = renderHook(() => useContactStore(), { wrapper });
    await waitForNextUpdate();

    expect(result.current.isEmpty).toBeTruthy();
  });

  test('is500', async () => {
    server.use(getContacts500);
    const { result, waitForValueToChange } = renderHook(() => useContactStore(), { wrapper });
    await waitForValueToChange(() => result.current.isError);

    expect(result.current.isError).toBeTruthy();
    expect(result.current.is500).toBeTruthy();
  });

  test('is400', async () => {
    server.use(getContacts400);
    const { result, waitForValueToChange } = renderHook(() => useContactStore(), { wrapper });
    await waitForValueToChange(() => result.current.is400);

    expect(result.current.isError).toBeTruthy();
    expect(result.current.is400).toBeTruthy();
  });
});
