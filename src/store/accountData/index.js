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

  if (action.type === 'CLEAN_ACCOUNT_DATA') {
    return {
      ...state,
      account: null,
    };
  }

  return state;
}

export const accountInfo = (state) => state?.accountData?.account ?? '';
export const userName = (state) => state?.accountData?.account?.name ?? '';
