export const ACTION_TYPES = {
  SET_TYPING_VALUE: 'SET_TYPING_VALUE',
  ERASE_VAL: 'ERASE_VAL'
};

const initialState = {
  value: ''
};

export type ChatTypingState = Readonly<typeof initialState>;

// reducer

export default (state: ChatTypingState = initialState, action): ChatTypingState => {
  switch (action.type) {
    case ACTION_TYPES.SET_TYPING_VALUE:
      return { ...state, value: action.payload };
    case ACTION_TYPES.ERASE_VAL:
      return { ...state, value: '' };
    default:
      return state;
  }
};

export const setTypingValue = value => ({
  type: ACTION_TYPES.SET_TYPING_VALUE,
  payload: value
});

// action creators

export const handleInputChange = e => dispatch => {
  const message = e.target.value;
  dispatch(setTypingValue(message));
};

export const eraseInputAfterSendingMessages = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.ERASE_VAL,
    payload: ''
  });
};
