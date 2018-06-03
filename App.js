import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/store';

import InitialScreen from './src/screens/initialScreen';

const App = () => (
  <Provider store={store}>
    <InitialScreen />
  </Provider>
);

export default App;
