import { renderHook } from '@testing-library/react-hooks';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContactStoreProvider, useContactStore } from './ContactStore';

describe('./stores/ContactStore', () => {
  let wrapper: FC;
  const queryClient = new QueryClient();

  beforeEach(() => {
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <ContactStoreProvider>{children}</ContactStoreProvider>
      </QueryClientProvider>
    );
  });

  it('should raise an error', () => {
    const { result, waitForNextUpdate } = renderHook(() => useContactStore());

    expect(result.error).toEqual(Error('useContactStore must be used within ContactStoreProvider'));
  });

  it('runs without error', () => {
    const { result } = renderHook(() => useContactStore(), { wrapper });
    expect(result.error).toBeFalsy();
  });

  it('can download data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useContactStore(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.findAll()?.length).toBe(2);
  });
});
