// Message used in chat
import { ALREADY_SAVED_MESSAGES } from 'app/shared/util/populated-data';

export interface IMessage {
  id?: any;
  number?: number;
  text?: string;
  sentBy?: string;
  isUserMessage?: boolean;
  date?: Date;
}

export const defaultValue: Readonly<IMessage> = {
  id: '',
  number: -1,
  text: 'First message hehehe',
  sentBy: 'admin',
  isUserMessage: true,
  date: new Date()
};

export const defaultValueMessages = ALREADY_SAVED_MESSAGES;

export interface IChatContact {
  id?: any;
  name?: string; // nickname/name+surname of given user
  profileImage?: string; // url with profile image
}
