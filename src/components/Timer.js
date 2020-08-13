import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimerDiv = styled.div`
  font-size: 100px;
`;

const Timer = (props) => {
  const { isActive, timeLeft, setTimeLeft, timesUp } = props;

  useEffect(() => {
    if (isActive) {
      // exit early when we reach 0
      if (!timeLeft) {
        timesUp();
        return;
      }

      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
    } // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [isActive, setTimeLeft, timeLeft, timesUp]);

  return <TimerDiv>{timeLeft}</TimerDiv>;
};

Timer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired,
  setTimeLeft: PropTypes.func.isRequired,
  timesUp: PropTypes.bool.isRequired,
};

export default Timer;
