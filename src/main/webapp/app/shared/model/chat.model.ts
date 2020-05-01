// Message used in chat
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

export const defaultValueMessages: ReadonlyArray<IMessage> = [
  {
    id: '1',
    number: 0,
    text: 'Hej! To moja pierwsza wiadomosc...',
    sentBy: 'admin',
    isUserMessage: true,
    date: new Date()
  },
  {
    id: '2',
    number: 1,
    text: 'Hej! Dzieki za wiadomosc',
    sentBy: 'user',
    isUserMessage: false,
    date: new Date()
  },
  {
    id: '3',
    number: 2,
    text: 'Ahahahahahhahahaahahahhha',
    sentBy: 'admin',
    isUserMessage: true,
    date: new Date()
  }
];

export interface IChatContact {
  id?: any;
  name?: string; // nickname/name+surname of given user
  profileImage?: string; // url with profile image
}
