import { setupServer } from 'msw/node';
import { defaultHandlers } from './default-handlers';

export const server = setupServer();
