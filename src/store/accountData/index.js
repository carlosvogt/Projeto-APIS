const initialState = {
  account: null,
};

export default function accountData(state = initialState, action) {
  if (action.type === 'SET_ACCOUNT_DATA') {
    return {
      ...state,
      account: action.payload,
    };
  }
  return state;
}

export const accountInfo = (state) => state?.accountData?.account ?? '';
