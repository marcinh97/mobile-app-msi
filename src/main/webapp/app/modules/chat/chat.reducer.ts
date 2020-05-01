import { defaultValueMessages, IMessage } from 'app/shared/model/chat.model';

export const ACTION_TYPES = {
  SEND_MESSAGE_ACTION: 'SEND_MESSAGE_ACTION',
  SET_ACTIVE_USER_ID: 'SET_ACTIVE_USER_ID'
};

// reducer

const initialState = {
  messages: defaultValueMessages as ReadonlyArray<IMessage>
};

export type ChatState = Readonly<typeof initialState>;

export default (state: ChatState = initialState, action): ChatState => {
  // reducer
  switch (action.type) {
    case ACTION_TYPES.SEND_MESSAGE_ACTION:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

// actions

export const sendMessageAction = message => ({
  type: ACTION_TYPES.SEND_MESSAGE_ACTION,
  payload: message
});

// action creators

export const handleSendingMessage = event => dispatch => {
  event.preventDefault();
  console.log('I am clicked YAS');
  // const val = "ABC"
  // dispatch(sendMessageAction("MENSAJE"))
  // // todo - zapisz wiadomosc
  // console.log(event.target)
};

export const setActiveUserId = id => ({
  type: ACTION_TYPES.SET_ACTIVE_USER_ID,
  payload: id
});
