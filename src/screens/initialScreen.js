import React from 'react';
import { Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Container from '../components/screenContainer';
import AddressSearchInput from '../components/addressSearchInput';

import { SET_DESTINY_LOCATION } from '../redux/reducers/location';

const ShadowBoxWrapper = styled.View`
  position: absolute;
  left: 14px;
  top: 14px;
  width: ${Dimensions.get('window').width - 28}px;
  background-color: #FFFFFF;
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

const StyledText = styled.Text`
  font-size: 18px;
  padding: 14px;
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
      showDateTimer: false,
      showMarker: false,
      dateTimeValue: `${new Date().getHours()}:${new Date().getMinutes()}`,
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
          <AddressSearchInput
            placeholder="Destino"
            onPress={(address) => {
              dispatch({ type: SET_DESTINY_LOCATION, payload: { ref: 'user_end_location', data: address } });
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
          <InputWrapper marginBottom={22}>
            <TextInput
              style={inputStyle}
              placeholder="Identificação para a retirada."
            />
          </InputWrapper>
          <InputWrapper marginBottom={22}>
            <TouchableOpacity onPress={() => this.setState({ showDateTimer: true })}>
              <StyledText>
                Horário da chegada: {this.state.dateTimeValue}
              </StyledText>
            </TouchableOpacity>
          </InputWrapper>
          <InputWrapper marginBottom={0}>
            <StyledText>
              Começar trajeto
            </StyledText>
          </InputWrapper>
          <DateTimePicker
            is24Hour
            mode="time"
            isVisible={this.state.showDateTimer}
            onConfirm={data => this.setState({
              dateTimeValue: `${new Date(data).getHours()}:${new Date(data).getMinutes()}`,
              showDateTimer: false,
            })}
            onCancel={() => this.setState({ showDateTimer: false })}
          />
        </ShadowBoxWrapper>
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
