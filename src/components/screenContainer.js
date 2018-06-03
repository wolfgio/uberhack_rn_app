import styled from 'styled-components';

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #4372BA;
  padding: 14px;
  ${props => props.customStyle}
`;

export default Container;
