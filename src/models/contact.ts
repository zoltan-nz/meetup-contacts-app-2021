export interface Address {
  city: string;
  zip: number;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  address?: Address;
}

export interface ContactResponse {
  contacts: Contact[];
}
