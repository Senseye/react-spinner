import React, { PureComponent } from 'react';
import Spinner from '../Spinner';

const COMPLETED_VALUE = 100;
const INC_STEP = 1;

export const randomDelay = () => Math.floor(Math.random() * (Math.random() * 250));

class SimulatedSpinner extends PureComponent {
  state = {
    actualValue: 0,
  };
  isStarted = false;

  start() {
    const { isStarted } = this;
    if (!isStarted) {
      this.isStarted = true;
      this.increaseProgress();
    }
  }

  reset() {
    this.isStarted = false;
    this.setState({
      actualValue: 0,
    });
  }

  increaseProgress() {
    const { actualValue } = this.state;
    window.setTimeout(() => {
      if (this.isStarted && actualValue < COMPLETED_VALUE) {
        this.setState({
          actualValue: actualValue + INC_STEP,
        });
        this.increaseProgress();
      }
    }, randomDelay());
  }

  render() {
    const { actualValue } = this.state;

    return (
      <div>
        <Spinner actualProgress={actualValue} />
        <button onClick={() => { this.start(); }}>START</button>
        <button onClick={() => { this.reset(); }}>RESET</button>
      </div>
    );
  }
}

export default SimulatedSpinner;
