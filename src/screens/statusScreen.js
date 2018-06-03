import React from 'react';
import styled from 'styled-components';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Container from '../components/screenContainer';

const StyledText = styled.Text`
  font-size: ${props => props.size}px;
  line-height: ${props => props.size}px;
  color: #FFFFFF;
  align-self: center;
  text-align: center;
  ${props => props.customStyle}
`;


class StatusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fill: 0 };
  }
  componentDidMount() {
   this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({ fill: this.state.fill + 1 });
  }

  interval;

  render() {
    return (
      <Container
        customStyle="align-items: center; justify-content: center"
      >
        <StyledText size={32} customStyle="margin-bottom: 42px;">
          Tempo estimado
        </StyledText>
        <AnimatedCircularProgress
          size={300}
          width={5}
          fill={this.state.fill}
          rotation={360}
          tintColor="#FFFFFF"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="rgba(255, 255, 255, 0.3)"
        >
          {
            () => (
              <StyledText size={80}>
                0:30
              </StyledText>
            )
          }
        </AnimatedCircularProgress>
      </Container>
    );
  }
}

export default StatusScreen;
