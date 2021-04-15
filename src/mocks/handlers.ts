import { rest } from 'msw';
import { v4 } from 'uuid';
import { Contact, ContactPostRequest } from '../models/contact';
import { contacts } from './data/contacts';

export const handlers = [
  rest.get('/api/contacts', async (_req, res, ctx) => res(ctx.status(200), ctx.delay(2000), ctx.json({ contacts }))),
  rest.post<ContactPostRequest>('/api/contacts', async (_req, res, ctx) => {
    const newContact: Contact = _req.body.contact;

    newContact.id = v4();
    contacts.push(newContact);

    return res(ctx.status(201), ctx.delay(), ctx.json(newContact));
  }),
];
