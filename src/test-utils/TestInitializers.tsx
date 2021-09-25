import { render, RenderOptions } from '@testing-library/react';
import { InitialEntry } from 'history';
import { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

export interface TestInitializersParams {
  initialEntries?: InitialEntry[] | undefined;
}

export const TestInitializers: FC<TestInitializersParams> = ({ children, initialEntries }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

// Source: https://testing-library.com/docs/react-testing-library/setup#custom-render
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: TestInitializers, ...options });

export * from '@testing-library/react';

export { customRender as render };
