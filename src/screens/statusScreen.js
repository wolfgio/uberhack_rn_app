import React from 'react';
import styled from 'styled-components';

import Container from '../components/screenContainer';

const StyledText = styled.Text`
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: #FFFFFF;
  align-self: center;
  text-align: center;
  ${props => props.customStyle}
`;


const StatusScreen = () => (
  <Container
    customStyle="justify-content: space-around;"
  >
    <StyledText size={32}>
      Tempo estimado
    </StyledText>
    <StyledText size={52}>
      0: 30h
    </StyledText>
    <StyledText size={32}>
      Posição na fila
    </StyledText>
    <StyledText size={52}>
      03
    </StyledText>
  </Container>
);

export default StatusScreen;
