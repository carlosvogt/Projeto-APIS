import { combineReducers, createStore } from 'redux';

import mode from './mode';

const rootReducer = combineReducers({
  mode,
});

const store = createStore(rootReducer);

export default store;
