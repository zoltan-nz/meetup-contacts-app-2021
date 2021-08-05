import { User } from './user';

export interface ChatMessage {
  id?: string;
  user: User;
  message: string;
  time: Date | string;
}
