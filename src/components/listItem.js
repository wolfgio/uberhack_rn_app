import React from 'react';
import styled from 'styled-components';

const TouchableContainer = styled.TouchableOpacity`
  padding: 22px 14px;
  background-color: #FAFAFA;
`;

const StyledTitle = styled.Text`
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.4;
  font-weight: 700;
`;

const StyledText = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.4;
`;

const ListItem = ({ item, onPress }) => (
  <TouchableContainer onPress={() => onPress(item)}>
    <StyledTitle>{item.name}</StyledTitle>
    <StyledText>{item.vicinity}</StyledText>
  </TouchableContainer>
);

export default ListItem;
