import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import { navigationPropConstructor } from '../redux/store';

// SCREENS
import InitialScreen from '../screens/initialScreen';
import StatusScreen from '../screens/statusScreen';
import SuccessScreen from '../screens/successScreen';

const AppNavigator = createStackNavigator({
  InitialScreen: {
    screen: InitialScreen,
    path: '/',
    navigationOptions: {
      title: 'Escolher destino',
    },
  },
  StatusScreen: {
    screen: StatusScreen,
    path: '/status',
    navigationOptions: {
      title: 'Status',
    },
  },
  SuccessScreen: {
    screen: SuccessScreen,
    path: '/success',
  },
}, {
  headerMode: 'float',
  initialRouteName: 'InitialScreen',
  headerTransitionPreset: 'uikit',
  navigationOptions: {
    gesturesEnabled: true,
    headerBackTitle: 'Voltar',
    header: null,
  },
});

export default AppNavigator;

class Navigator extends React.Component {
  componentDidMount() {
    initializeListeners('root', this.props.nav);
  }

  render() {
    const navigation = navigationPropConstructor(
      this.props.dispatch,
      this.props.nav,
    );
    return (
      <AppNavigator navigation={navigation} />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export const ConnectedNavigator = connect(mapStateToProps)(Navigator);
