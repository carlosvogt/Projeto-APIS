const initialState = {
  user: null,
};

export default function auth(state = initialState, action) {
  if (action.type === 'SIGN_IN') {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === 'SIGN_OUT') {
    return {
      ...state,
      user: null,
    };
  }

  return state;
}

export const userUid = (state) => state?.auth?.user?.user?.uid ?? '';
export const userEmail = (state) => state?.auth?.user?.user?.email ?? '';
export const userInfo = (state) => state?.auth?.user ?? '';
