import React from 'react';
import { TextInput, ActivityIndicator, FlatList, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import Container from '../components/screenContainer';

import { SET_LOCATION, GOOGLE_API_KEY } from '../redux/reducers/location';

const styles = {
  input: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
};

function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return (...args) => {
    callbackArgs = args;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const renderListItem = data => (
  <Text>
    {data.item.name}
  </Text>
);

class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nearbyPlaces: [],
    };
    this.positionWatcher = null;
  }

  componentDidMount() {
    navigator.geolocation.requestAuthorization();
    this.positionWatcher = navigator.geolocation.watchPosition(
      position => this.props.dispatch({ type: SET_LOCATION, payload: position }),
      error => Alert.alert('Atenção!', `O seguinte erro aconteceu: ${error.message}`),
      {
        timeout: 500,
      },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.positionWatcher);
  }

  async getNearbyLocations(location, keyword) {
    await this.setState({ isLoading: true });
    const { latitude, longitude } = location.user_location.coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&keyword=${keyword}&key=${GOOGLE_API_KEY}`;
    return fetch(url)
      .then(resp => resp.json())
      .then((payload) => {
        const { results, status } = payload;
        this.setState({
          nearbyPlaces: results,
          status,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <Container>
        <TextInput
          placeholder="Destino..."
          onChangeText={debounce(args => this.getNearbyLocations(this.props.location, args), 300)}
          style={styles.input}
        />
        {this.state.isLoading ? <ActivityIndicator /> : this.state.status === 'ZERO_RESULTS' ?
          <Text>Nenhum resultado encontrado</Text> :
          <FlatList
            data={this.state.nearbyPlaces}
            renderItem={renderListItem}
          />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
});

export default connect(mapStateToProps)(InitialScreen);
