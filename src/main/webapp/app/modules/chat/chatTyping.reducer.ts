export const ACTION_TYPES = {
  SET_TYPING_VALUE: 'SET_TYPING_VALUE'
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
  dispatch(setTypingValue(e.target.value));
};
