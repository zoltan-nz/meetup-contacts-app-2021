import { rest, RestHandler } from 'msw';
import { v4 } from 'uuid';
import { Contact, ContactPostRequest, ContactsResponse } from '../../models/contact';
import { CONTACTS_API_URL } from '../../stores/ContactStore';
import { contacts } from '../data/contacts';

export const getContacts200: RestHandler = rest.get<ContactsResponse>(CONTACTS_API_URL, async (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(), ctx.json({ contacts }))
);

export const getContactsEmpty200: RestHandler = rest.get<ContactsResponse>(CONTACTS_API_URL, async (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(), ctx.json({ contacts: [] }))
);

export const postContact201: RestHandler = rest.post<ContactPostRequest>(CONTACTS_API_URL, async (req, res, ctx) => {
  const newContact: Contact = req.body.contact;

  newContact.id = v4();
  contacts.push(newContact);

  return res(ctx.status(201), ctx.delay(), ctx.json(newContact));
});

export const postContact400: RestHandler = rest.post(CONTACTS_API_URL, async (req, res, ctx) => res(ctx.status(400)));

export const getContacts500: RestHandler = rest.get(CONTACTS_API_URL, async (req, res, ctx) =>
  res(ctx.status(500), ctx.delay(), ctx.json({}))
);
export const getContacts400: RestHandler = rest.get(CONTACTS_API_URL, async (req, res, ctx) => res(ctx.status(400)));
