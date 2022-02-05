const initialState = {
  darkMode: false,
};

export default function mode(state = initialState, action) {
  if (action.type === 'SET_MODE') {
    return {
      ...state,
      darkMode: action.payload,
    };
  }

  return state;
}
