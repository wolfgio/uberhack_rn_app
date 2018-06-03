import { combineReducers } from 'redux';

import user from './reducers/user';
import nav from './reducers/nav';
import location from './reducers/location';

export default combineReducers({
  user,
  nav,
  location,
});
