import { defaultValueMessages, IMessage } from 'app/shared/model/chat.model';
import { connect } from 'app/modules/chat/websocket-chat-middleware';

export const ACTION_TYPES = {
  SEND_MESSAGE_ACTION: 'SEND_MESSAGE_ACTION',
  SET_ACTIVE_USER_ID: 'SET_ACTIVE_USER_ID',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_FOUND_USER: 'TOGGLE_FOUND_USER',
  TOGGLE_PREFERENCES: 'TOGGLE_PREFERENCES',
  RESET_LOADING: 'RESET_LOADING',
  FIND_SOMEONE_TO_CHAT: 'FIND_SOMEONE_TO_CHAT'
};

// reducer

const initialState = {
  messages: defaultValueMessages as ReadonlyArray<IMessage>,
  isLoading: true,
  isFoundUser: false,
  isPreferencesShown: false
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
    case ACTION_TYPES.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case ACTION_TYPES.TOGGLE_FOUND_USER:
      return {
        ...state,
        isFoundUser: !state.isFoundUser
      };
    case ACTION_TYPES.RESET_LOADING:
      return {
        ...state,
        isFoundUser: false,
        isLoading: true
      };
    case ACTION_TYPES.TOGGLE_PREFERENCES:
      return {
        ...state,
        isPreferencesShown: !state.isPreferencesShown
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

export const toggleIsLoading = () => ({
  type: ACTION_TYPES.TOGGLE_LOADING,
  payload: ''
});

export const toggleFoundUserToTalkTo = () => ({
  type: ACTION_TYPES.TOGGLE_FOUND_USER,
  payload: ''
});

export const togglePreferencesModalAction = () => ({
  type: ACTION_TYPES.TOGGLE_PREFERENCES,
  payload: ''
});
// action creators

export const handleSendingMessage = mess => dispatch => {
  event.preventDefault();
  // console.log('Wiadomosc do wysylki:');
  // console.log(mess);
  // const val = "ABC"
  const text = mess;
  const obj = {
    id: '4',
    number: 3,
    text,
    sentBy: 'admin',
    isUserMessage: true,
    date: new Date()
  };
  dispatch(sendMessageAction(obj));
  // // todo - zapisz wiadomosc
  // console.log(event.target)
};

export const setActiveUserId = id => ({
  type: ACTION_TYPES.SET_ACTIVE_USER_ID,
  payload: id
});

const resetLoading = () => ({
  type: ACTION_TYPES.RESET_LOADING,
  payload: ''
});

export const resetLoadingAct = () => dispatch => {
  dispatch(resetLoading());
};

export const toggleLoading = () => dispatch => {
  dispatch(toggleIsLoading());
};

export const toggleFoundUser = () => dispatch => {
  dispatch(toggleFoundUserToTalkTo());
};

export const togglePreferencesModal = () => dispatch => {
  dispatch(togglePreferencesModalAction());
};

export const handleValidSubmit = (event, values) => dispatch => {
  // console.log(values) // przygotowane do zapisu
  // browserHistory.push('/account/chatwait')

  window.location.href = '/account/chatwait';

  // browserHistory
};
