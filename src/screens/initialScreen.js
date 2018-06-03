import React from 'react';
import { Dimensions, TextInput, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styled from 'styled-components';
import axios from 'axios';

import Container from '../components/screenContainer';
import AddressSearchInput from '../components/addressSearchInput';

import { SET_DESTINY_LOCATION, GOOGLE_API_KEY } from '../redux/reducers/location';

const ShadowBoxWrapper = styled.View`
  position: absolute;
  left: 14px;
  top: 48px;
  width: ${Dimensions.get('window').width - 28}px;
  background-color: rgba(67, 114, 186, 0.7);
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 2;
  padding: 14px;
  z-index: 9999;
`;

const InputWrapper = styled.View`
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 2;
  margin-bottom: ${props => props.marginBottom};
`;

const ButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  left: 14px;
  bottom: 42px;
  width: ${Dimensions.get('window').width - 28}px;
  background-color: rgba(67, 114, 186, 1);
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 2;
  padding: 16px;
  z-index: 9999;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.opacity};
`;

const ButtonText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  font-weight: 700;
  color: #FFFFFF;
  align-self: center;
  margin-right: 8px;
`;

const inputStyle = {
  fontSize: 18,
  padding: 14,
};

class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -23.508086,
        longitude: -46.651059,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      showMarker: false,
      identificationName: '',
      isLoading: false,
    };
  }

  async submit() {
    await this.setState({ isLoading: true });
    const payload = {
      userId: 1,
      partida: {
        latitude: this.props.location.user_location.coords.latitude.toString(),
        longitude: this.props.location.user_location.coords.longitude.toString(),
      },
      destino: {
        latitude: this.state.region.latitude.toString(),
        longitude: this.state.region.longitude.toString(),
      },
      value: {
        valor: this.state.identificationName,
        horario: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    };
    const json = JSON.stringify(payload);
    axios.post('https://uneer.herokuapp.com/localizacao/atual', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.props.navigation.navigate('StatusScreen');
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        Alert.alert('Atenção', error.toString());
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { dispatch } = this.props;
    return (
      <Container>
        <ShadowBoxWrapper>
          <AddressSearchInput
            placeholder="Destino"
            onPress={(address) => {
              dispatch({ type: SET_DESTINY_LOCATION, payload: { ref: 'user_start_location', data: address } });
              this.setState({
                region: {
                  ...this.state.region,
                  latitude: address.geometry.location.lat,
                  longitude: address.geometry.location.lng,
                },
                showMarker: true,
              });
            }}
          />
          <InputWrapper marginBottom={0}>
            <TextInput
              style={inputStyle}
              onChangeText={text => this.setState({ identificationName: text })}
              placeholder="Identificação para a retirada."
              value={this.state.identificationName}
            />
          </InputWrapper>
        </ShadowBoxWrapper>
        <ButtonWrapper
          onPress={() => this.submit()}
          activeOpacity={0.9}
          disabled={this.state.isLoading}
          opacity={this.state.isLoading ? 0.8 : 1}
        >
          <ButtonText>
            Concluir
          </ButtonText>
          {this.state.isLoading ? <ActivityIndicator color="#FFFFFF" /> : null}
        </ButtonWrapper>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          region={this.state.region}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {this.state.showMarker ?
            <MapViewDirections
              origin={{
                latitude: this.props.location.user_location.coords.latitude,
                longitude: this.props.location.user_location.coords.longitude,
              }}
              destination={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              strokeWidth={8}
              strokeColor="rgba(67, 114, 186, 1)"
              apikey={GOOGLE_API_KEY}
            /> : null}
          {this.state.showMarker ? <Marker coordinate={this.state.region} /> : null}
        </MapView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
});

export default connect(mapStateToProps)(InitialScreen);
