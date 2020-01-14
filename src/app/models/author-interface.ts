import { MessageModel } from './message-interface';

export interface AuthorModel {
  id: number;
  name: string;
  info: string;
  imageUrl: string;
  messages?: MessageModel[];
}
