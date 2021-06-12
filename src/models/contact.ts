export interface Address {
  city: string;
  zip: number;
}

export interface Contact {
  id: string;
  fullName: string;
  phone: string;
  address?: Address;
}

export interface ContactsResponse {
  contacts: Contact[];
}

export interface ContactPostRequest {
  contact: Contact;
}
