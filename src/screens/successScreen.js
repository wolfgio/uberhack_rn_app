import React from 'react';
import styled from 'styled-components';

import Container from '../components/screenContainer';
import CHECKICON from '../asset/checked.png';

const StyledText = styled.Text`
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: #FFFFFF;
  align-self: center;
  text-align: center;
  ${props => props.customStyle}
`;

const Image = styled.Image`
  width: 98px;
  height: 98px;
  tintColor: #FFFFFF;
`;

const ImageContainer = styled.View`
  width: 148px;
  height: 148px;
  border-radius: 74px;
  border-width: 2px;
  border-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const SuccessScreen = () => (
  <Container
    customStyle="align-items: center; justify-content: center"
  >
    <StyledText size={68}>Pronto!</StyledText>
    <ImageContainer>
      <Image source={CHECKICON} />
    </ImageContainer>
  </Container>
);

export default SuccessScreen;
