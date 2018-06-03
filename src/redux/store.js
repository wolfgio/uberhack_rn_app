import { createStore, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware, createNavigationPropConstructor } from 'react-navigation-redux-helpers';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export const navigationPropConstructor = createNavigationPropConstructor('root');

const store = createStore(rootReducer, applyMiddleware(navMiddleware, logger));

export default store;
