import { combineReducers, createStore } from 'redux';

import mode from './mode';
import auth from './auth';
import accountData from './accountData';

const rootReducer = combineReducers({
  mode,
  auth,
  accountData,
});

const store = createStore(rootReducer);

export default store;
