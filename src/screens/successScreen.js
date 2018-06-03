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


const SuccessScreen = () => (
  <Container
    customStyle="align-items: center; justify-content: center"
  >
    <StyledText size={68}>Pronto!</StyledText>
  </Container>
);

export default SuccessScreen;
