import { rest } from 'msw';
import { contacts } from './data/contacts';

export const handlers = [
  rest.get('/api/contacts', async (_req, res, ctx) => res(ctx.status(200), ctx.delay(2000), ctx.json({ contacts }))),
];
