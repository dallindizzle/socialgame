import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;

  height: 420px;
  justify-content: center;
  align-items: center;
`;

const Word = styled.div`
  font-size: 60px;
`;

const Lightning = (props) => {
  const { words } = props;

  return (
    <Container>
      {words.map((word) => (
        <Word key={word}>{word}</Word>
      ))}
    </Container>
  );
};

Lightning.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Lightning;
