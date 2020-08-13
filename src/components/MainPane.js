import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import useSound from 'use-sound';

import { words } from '../resources/words.json';
import Lightning from './Lightning';
import Timer from './Timer';
import { saveSpot, getSpot } from '../utils/saveSpot';
import horn from '../resources/mlg-airhorn.mp3';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  height: 100%;

  justify-content: space-evenly;
  align-items: center;

  ${(props) => {
    if (props.timesUp) {
      return css`
        background-color: red;
      `;
    }
    return '';
  }}
`;

const BottomSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ModeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ModeButton = styled.div`
  height: 100px;
  width: 200px;
  margin: 20px 20px 20px 20px;

  background-color: ${(props) => (props.isActive ? '#035773' : '#008cba')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  color: white;
  cursor: pointer;

  font-size: 30px;
`;

const GoButton = styled.div`
  height: 100px;
  width: 200px;
  margin: 20px 20px 20px 20px;

  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  color: white;
  cursor: pointer;

  font-size: 40px;
`;

const WordArea = styled.div`
  margin-top: 60px;
  padding-bottom: 10px;

  height: 400px;
  font-size: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordAreaContainer = styled.div`
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
`;

const MODES = {
  MATCH: 'match',
  UNIQUE: 'unique',
  LIGHTNING: 'lightning',
};

const MainPane = () => {
  const [play] = useSound(horn);

  const [mode, setMode] = useState(MODES.MATCH);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timesUp, setTimesUp] = useState(false);
  const [wordArea, setWordArea] = useState(<WordArea />);
  const [spot, setSpot] = useState(() => {
    const localSpot = getSpot();
    if (!localSpot) {
      saveSpot(0);
      return 0;
    }
    return localSpot;
  });

  const getWords = useCallback((index, amount = 1) => {
    const currentWords = words.slice(index, index + amount);
    setSpot(index + amount);
    return currentWords.length > 1 ? currentWords : currentWords[0];
  }, []);

  const getWordArea = useCallback(() => {
    switch (mode) {
      case MODES.MATCH:
        return <WordArea>{getWords(spot)}</WordArea>;
      case MODES.UNIQUE:
        return <WordArea>{getWords(spot)}</WordArea>;
      case MODES.LIGHTNING:
        return <Lightning words={getWords(spot, 6)} />;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [getWords, mode]);

  const setActiveMode = useCallback((modeToSet) => {
    setTimesUp(false);
    setMode(modeToSet);
    setTimerActive(false);
    setTimeLeft(60);
  }, []);

  const timesUpCallBack = useCallback(() => {
    setTimesUp(true);
    play();
  }, [play]);

  const onGoClick = useCallback(() => {
    setTimesUp(false);
    setTimerActive(true);
    setTimeLeft(60);
    saveSpot(spot);
    setWordArea(getWordArea);
  }, [getWordArea, spot]);

  return (
    <Container timesUp={timesUp}>
      <WordAreaContainer isActive={timerActive}>{wordArea}</WordAreaContainer>
      <Timer
        isActive={timerActive}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        timesUp={timesUpCallBack}
      />
      <BottomSelector>
        <ModeContainer>
          <ModeButton
            isActive={mode === MODES.MATCH}
            onClick={() => setActiveMode(MODES.MATCH)}
          >
            {MODES.MATCH}
          </ModeButton>
          <ModeButton
            isActive={mode === MODES.UNIQUE}
            onClick={() => setActiveMode(MODES.UNIQUE)}
          >
            {MODES.UNIQUE}
          </ModeButton>
          <ModeButton
            isActive={mode === MODES.LIGHTNING}
            onClick={() => setActiveMode(MODES.LIGHTNING)}
          >
            {MODES.LIGHTNING}
          </ModeButton>
        </ModeContainer>
        <GoButton onClick={onGoClick}>Go</GoButton>
      </BottomSelector>
    </Container>
  );
};

export default MainPane;
