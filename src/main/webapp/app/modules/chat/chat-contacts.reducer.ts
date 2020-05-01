import { IChatContact } from 'app/shared/model/chat.model';

const initialState = {
  contacts: [
    {
      id: '1213',
      name: 'Adam Nowak',
      profileImage: 'https://image.shutterstock.com/image-photo/pretty-woman-elderly-lifestyle-studio-600w-1677947602.jpg'
    },
    {
      id: '32423',
      name: 'Anna Kowalczyk',
      profileImage: 'https://www.dw.com/image/53138967_303.jpg'
    },
    {
      id: '223423',
      name: 'Jan Nowacki',
      profileImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mateusz_Morawiecki_Prezes_Rady_Ministr%C3%B3w_%28cropped%29.jpg/1024px-Mateusz_Morawiecki_Prezes_Rady_Ministr%C3%B3w_%28cropped%29.jpg'
    },
    {
      id: '23444',
      name: 'Ela Bela',
      profileImage: 'https://pbs.twimg.com/media/DetKu0UX0AAsg1I?format=jpg&name=medium'
    },
    {
      id: '223423',
      name: 'Jan Nowacki',
      profileImage: 'https://static.polityka.pl/_resource/res/path/27/0a/270a81bd-e20f-4327-b532-9964f0a6096a_f1400x900'
    },
    {
      id: '23444',
      name: 'Ela Bela',
      profileImage: 'https://image.shutterstock.com/image-photo/pretty-woman-elderly-lifestyle-studio-600w-1677947602.jpg'
    },
    {
      id: '223423',
      name: 'Jan Nowacki',
      profileImage: 'https://image.shutterstock.com/image-photo/pretty-woman-elderly-lifestyle-studio-600w-1677947602.jpg'
    },
    {
      id: '23444',
      name: 'Ela Bela',
      profileImage: 'https://image.shutterstock.com/image-photo/pretty-woman-elderly-lifestyle-studio-600w-1677947602.jpg'
    }
  ] as ReadonlyArray<IChatContact>,
  chosenUserId: ''
};

// Reducer

export type ChatContacts = Readonly<typeof initialState>;

export default (state: ChatContacts = initialState, action): ChatContacts => {
  return state;
};

// Actions

// Action creators
