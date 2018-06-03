import { combineReducers } from 'redux';

import user from './reducers/user';
import nav from './reducers/nav';

export default combineReducers({
  user,
  nav,
});
