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
    this.state = { fill: 0, ms: 0, countDown: 60 };
  }
  componentDidMount() {
   this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.fill >= 100) {
      clearInterval(this.interval);
      return this.props.navigation.navigate('SuccessScreen');
    }
    const fill = ((this.state.ms) * 100 / 60);
    this.setState({
      fill,
      ms: this.state.ms + 1,
      countDown: this.state.countDown - 1,
    });
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
          backgroundColor="rgba(255, 255, 255, 0.3)"
        >
          {
            () => (
              <StyledText size={80}>
                0:{this.state.countDown}
              </StyledText>
            )
          }
        </AnimatedCircularProgress>
      </Container>
    );
  }
}

export default StatusScreen;
