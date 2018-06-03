import React from 'react';
import { Dimensions, TextInput } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components';

import Container from '../components/screenContainer';
import AddressSearchInput from '../components/addressSearchInput';

import { SET_DESTINY_LOCATION } from '../redux/reducers/location';

const ShadowBoxWrapper = styled.View`
  position: absolute;
  left: 14px;
  top: 14px;
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
`;

const ButtonText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  font-weight: 700;
  color: #FFFFFF;
  align-self: center;
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
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <Container>
        <ShadowBoxWrapper>
          <AddressSearchInput
            placeholder="Minha localização"
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
          onPress={() => this.props.navigation.navigate('StatusScreen')}
          activeOpacity={0.9}
        >
          <ButtonText>
            Concluir
          </ButtonText>
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
