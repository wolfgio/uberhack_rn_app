import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/store';

import { ConnectedNavigator } from './src/navigation/appNavigator';

/**
 * I disabled warning box, because a error related to this: https://github.com/react-navigation/react-navigation/issues/3956
 */
console.disableYellowBox = true;

const App = () => (
  <Provider store={store}>
    <ConnectedNavigator />
  </Provider>
);

export default App;
