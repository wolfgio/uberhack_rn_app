import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import Container from '../components/screenContainer';
import AddressSearchInput from '../components/addressSearchInput';

const ShadowBoxWrapper = styled.View`
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 2;
  padding: 8px;
`;

const InitialScreen = () => (
  <Container>
    <ShadowBoxWrapper>
      <AddressSearchInput placeholder="Minha localização" />
      <AddressSearchInput placeholder="Destino" />
    </ShadowBoxWrapper>
  </Container>
);

export default InitialScreen;
