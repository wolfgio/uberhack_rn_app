import React from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

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

const InitialScreen = ({ dispatch }) => (
  <Container>
    <ShadowBoxWrapper>
      <AddressSearchInput
        placeholder="Minha localização"
        onPress={address => dispatch({ type: SET_DESTINY_LOCATION, payload: { ref: 'user_start_location', data: address } })}
      />
      <AddressSearchInput
        placeholder="Destino"
        onPress={address => dispatch({ type: SET_DESTINY_LOCATION, payload: { ref: 'user_end_location', data: address } })}
      />
    </ShadowBoxWrapper>
  </Container>
);

export default connect()(InitialScreen);
