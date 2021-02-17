export interface Address {
  city: string;
  zip: number;
}

export interface Contact {
  name: string;
  phone: string;
  address?: Address;
}
