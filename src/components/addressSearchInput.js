import React from 'react';
import { TextInput, ActivityIndicator, FlatList, Alert, Animated } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ListItem from '../components/listItem';

import { SET_USER_LOCATION, GOOGLE_API_KEY } from '../redux/reducers/location';

const styles = {
  input: {
    fontSize: 18,
    padding: 14,
  },
};

const Wrapper = styled.View`
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 2;
  margin-bottom: 22px;
`;

const EmptyText = styled.Text`
  padding: 22px;
  align-self: center;
  text-align: center;
  fontSize: 16px;
`;

const ActivitieContainer = styled.View`
  padding: 22px;
`;

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

class AddressSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isLoading: false,
      nearbyPlaces: [],
    };
    this.positionWatcher = null;
  }

  componentDidMount() {
    navigator.geolocation.requestAuthorization();
    this.positionWatcher = navigator.geolocation.watchPosition(
      position => this.props.dispatch({ type: SET_USER_LOCATION, payload: position }),
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
    await this.setState({ isLoading: true, keyword });
    if (keyword.length > 0) {
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
    return this.setState({ isLoading: false, nearbyPlaces: [], status: null });
  }

  async handPress(address) {
    await this.setState({
      nearbyPlaces: [],
      status: null,
      keyword: address.name,
    });
    this.props.onPress(address);
  }

  renderListItem(data) {
    return (
      <ListItem item={data.item} onPress={address => this.handPress(address)} />
    );
  }

  render() {
    return (
      <Wrapper>
        <Animated.View>
          <TextInput
            placeholder={this.props.placeholder}
            onChangeText={debounce(args => this.getNearbyLocations(this.props.location, args), 300)}
            style={styles.input}
            value={this.state.keyword}
          />
          {this.state.isLoading ?
            <ActivitieContainer>
              <ActivityIndicator />
            </ActivitieContainer> : this.state.status === 'ZERO_RESULTS' ?
              <EmptyText>Nenhum resultado encontrado</EmptyText> :
              <FlatList
                data={this.state.nearbyPlaces}
                renderItem={data => this.renderListItem(data)}
              />}
        </Animated.View>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
});

export default connect(mapStateToProps)(AddressSearchInput);
