import { connect, sendMessage, sendSystemMessage } from 'app/config/websocket-chat-middleware';
import { defaultValue } from 'app/shared/model/chat.model';
import { eraseInputAfterSendingMessages, handleInputChange } from 'app/modules/chat/chatTyping.reducer';

export const ACTION_TYPES = {
  SEND_MESSAGE_ACTION: 'SEND_MESSAGE_ACTION',
  SET_ACTIVE_USER_ID: 'SET_ACTIVE_USER_ID',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_FOUND_USER: 'TOGGLE_FOUND_USER',
  TOGGLE_PREFERENCES: 'TOGGLE_PREFERENCES',
  RESET_LOADING: 'RESET_LOADING',
  FIND_SOMEONE_TO_CHAT: 'FIND_SOMEONE_TO_CHAT',
  SHOW_USER_PROFILE_MODAL: 'SHOW_USER_PROFILE_MODAL',
  FOUND_USER_DETAILS: 'FOUND_USER_DETAILS',
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  STOP_CURRENT_CHAT: 'STOP_CURRENT_CHAT',
  AGREE_TO_START_CHAT: 'AGREE_TO_START',
  DISAGREE_TO_START_CHAT: 'DISAGREE_TO_START',
  CHAT_DECISION_MADE: 'CHAT_DECISION_MADE'
};

// reducer

const initialState = {
  // messages: defaultValueMessages as ReadonlyArray<IMessage>,
  messages: [JSON.stringify(defaultValue)],
  isLoading: true,
  isFoundUser: false,
  isPreferencesShown: false,
  isProfileModalShown: false,
  foundUserDetails: { username: '', hobbies: [], images: [] },
  shouldStopChat: false,
  howManyAgreed: 0,
  howManyDisagreed: 0,
  chatDecisionMade: false
};

export type ChatState = Readonly<typeof initialState>;

export default (state: ChatState = initialState, action): ChatState => {
  console.log('DEF: ' + action.type);
  // reducer
  switch (action.type) {
    case ACTION_TYPES.SEND_MESSAGE_ACTION:
      console.log('YES');
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
    case ACTION_TYPES.SHOW_USER_PROFILE_MODAL:
      return {
        ...state,
        isProfileModalShown: !state.isProfileModalShown
      };
    case ACTION_TYPES.FOUND_USER_DETAILS:
      return {
        ...state,
        foundUserDetails: action.payload
      };
    case ACTION_TYPES.GET_USER_DETAILS:
      return {
        ...state
      };
    case ACTION_TYPES.STOP_CURRENT_CHAT:
      return {
        ...state,
        shouldStopChat: true
      };
    case ACTION_TYPES.AGREE_TO_START_CHAT:
      return {
        ...state,
        howManyAgreed: state.howManyAgreed + 1
      };
    case ACTION_TYPES.DISAGREE_TO_START_CHAT:
      return {
        ...state,
        howManyDisagreed: state.howManyDisagreed + 1
      };
    case ACTION_TYPES.CHAT_DECISION_MADE:
      return {
        ...state,
        chatDecisionMade: true
      };
    case 'POLACZ_MNIE':
      return {
        ...state
      };
    default:
      return state;
  }
};

// actions

const stopChatAction = () => ({
  type: ACTION_TYPES.STOP_CURRENT_CHAT,
  payload: true
});

export const stopChatNow = () => dispatch => {
  console.log('Stopping chat...');
  dispatch(stopChatAction());
};

const makeChatDecisionAction = () => ({
  type: ACTION_TYPES.CHAT_DECISION_MADE,
  payload: true
});

export const makeChatDecision = () => dispatch => {
  console.log('CHAT DECISION MADE...');
  dispatch(makeChatDecisionAction());
};

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
  eraseInputAfterSendingMessages();
  event.preventDefault();
  console.log('Wiadomosc do wysylki:');
  console.log(mess);
  // dispatch(sendMessageAction(mess))
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
  // // todo - zapisz wiadomosc
  sendMessage(mess);

  // console.log(event.target)
};

export const STOP_CHAT = '@@##STOP_CHAT_123##@@';

const agreeToTalkAction = () => ({
  type: ACTION_TYPES.AGREE_TO_START_CHAT,
  payload: ''
});

const disAgreeToTalkAction = () => ({
  type: ACTION_TYPES.DISAGREE_TO_START_CHAT,
  payload: ''
});

export const AGREE_TO_TALK = '@@##AGREE_TO_TALK##@@';
export const DISAGREE_TO_TALK = '@@##DISAGREE_TO_TALK##@@';

export const agreeToTalk = username => dispatch => {
  // add how many agreed
  console.log("LET'S TALK");
  dispatch({
    type: ACTION_TYPES.AGREE_TO_START_CHAT,
    payload: ''
  });
  // send message with agree
  console.log('Czekamy na potwierdzenie od ' + username);
  dispatch({
    type: ACTION_TYPES.CHAT_DECISION_MADE,
    payload: ''
  });
  sendSystemMessage(AGREE_TO_TALK);

  // wait
};

export const disagreeToTalk = () => dispatch => {
  // send message with disagree
  // close window
  dispatch({
    type: ACTION_TYPES.CHAT_DECISION_MADE,
    payload: ''
  });
  sendSystemMessage(DISAGREE_TO_TALK);
};

export const resetLoadingAct = username => dispatch => {
  console.log('Przerywamy rozmowe z: ' + username);
  // przerwij tutaj
  console.log('Stopping chat...');
  dispatch(stopChatAction());
  // wyslij wiadomosc ze przerwano
  sendSystemMessage(STOP_CHAT);
  dispatch(resetLoading());
};

export const setActiveUserId = id => ({
  type: ACTION_TYPES.SET_ACTIVE_USER_ID,
  payload: id
});

const resetLoading = () => ({
  type: ACTION_TYPES.RESET_LOADING,
  payload: ''
});

export const toggleLoading = () => dispatch => {
  dispatch(toggleIsLoading());
};

export const toggleFoundUser = () => dispatch => {
  console.log('FOUND UUUUUUSER');
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

export const waitForOtherAction = () => ({
  type: 'POLACZ_MNIE',
  payload: ''
});

export const waitForOther = () => dispatch => {
  console.log('Dudud');
};

const connectAction = () => ({
  type: ACTION_TYPES.FIND_SOMEONE_TO_CHAT,
  payload: ''
});

export const connectChat = () => dispatch => {
  console.log('Connect me to chat');
  dispatch(connectAction());
};

const toggleShowProfileAction = userInfo => ({
  type: ACTION_TYPES.SHOW_USER_PROFILE_MODAL,
  payload: userInfo
});

export const toggleShowProfileModal = userInfo => dispatch => {
  dispatch(toggleShowProfileAction(userInfo));
};

const getUserDetailsAction = () => ({
  type: ACTION_TYPES.GET_USER_DETAILS,
  payload: ''
});

export const getUserDetails = () => dispatch => {
  dispatch(getUserDetailsAction());
};
