// Empty template - should be populated from db
export const FOUND_PERSON = {
  name: 'Anna Nowak-Kowalska',
  profileUrl: 'https://www.dw.com/image/53138967_303.jpg',
  interests: ['football', 'basketball']
};

export const ALREADY_SAVED_MESSAGES = [
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
  },
  {
    id: '4',
    number: 3,
    text: 'Spoko',
    sentBy: 'user',
    isUserMessage: false,
    date: new Date()
  },
  {
    id: '5',
    number: 4,
    text: 'A u ciebie co tam  hihihihi',
    sentBy: 'user',
    isUserMessage: false,
    date: new Date()
  },
  {
    id: '6',
    number: 5,
    text:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    sentBy: 'admin',
    isUserMessage: true,
    date: new Date()
  }
];

export const FOUND_USER_PROFILE = {
  username: 'JanKowalski123',
  hobbies: ['Basketball', 'Football', 'Golf'],
  images: [
    'https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/splay/2019/09/BoJack.jpg',
    'https://3.bp.blogspot.com/-fyUiBNhkXEg/W6e5Vu_IyDI/AAAAAAAAIbE/LtAxxswfyToRjAyp4Nht1beSky6dp8iCACLcBGAs/s1600/bojack-horseman.jpg'
  ],
  aboutme: 'Jestem bardzo fajna!!!!!! ',
  age: 33
};

export const FOUND_USER_PROFILE_TWO = {
  username: 'Elwirka babczyk',
  hobbies: ['manicure', 'Adele', 'music', 'Español'],
  images: [
    'https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/splay/2019/09/BoJack.jpg',
    'https://3.bp.blogspot.com/-fyUiBNhkXEg/W6e5Vu_IyDI/AAAAAAAAIbE/LtAxxswfyToRjAyp4Nht1beSky6dp8iCACLcBGAs/s1600/bojack-horseman.jpg'
  ],
  aboutme: 'Jestem bardzo fajna!!!!!! ',
  age: 18
};
