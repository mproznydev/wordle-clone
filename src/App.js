import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const wordList = ['patio', 'darts', 'piano'];
const secret = wordList[0];

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkmode.colorTone7}; ;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: 70px;
  height: 70px;
  border: 2px solid ${({ theme, attempt, index }) => (attempt[index] == null ? theme.colors.darkmode.colorTone4 : theme.colors.darkmode.colorTone3)};
  margin: 0.15rem;
  color: ${({ theme }) => theme.colors.darkmode.colorTone1};
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: 70px;
  animation: ${({ attempt, index }) => (attempt[index] != null ? 'cellAnimation 0.15s cubic-bezier(0.39, 0.575, 0.565, 1) both' : 'none')};

  @keyframes cellAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  color: #d7dadc;
  margin: 1rem;
`;

function App() {
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [history, setHistory] = useState([]);
  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
  });

  const handlePressKey = (e) => {
    if (currentAttempt.length < 5 && e.keyCode >= 65 && e.keyCode <= 90) {
      setCurrentAttempt(currentAttempt + e.key.toUpperCase());
    }
    if (e.key === 'Backspace') {
      setCurrentAttempt(currentAttempt.slice(0, currentAttempt.length - 1));
    }
    if (e.key === 'Enter') {
      if (currentAttempt.length === 5) {
        setHistory([...history, currentAttempt]);
        setCurrentAttempt([]);
      }
    }
  };

  const renderGrid = () => {
    let rows = [];
    for (let i = 0; i < 6; i++) {
      if (i < history.length) {
        rows.push(<Attempt key={i} attempt={history[i]} solved={true}></Attempt>);
      } else if (i === history.length) {
        rows.push(<Attempt key={i} attempt={currentAttempt} solved={false}></Attempt>);
      } else {
        rows.push(<Attempt key={i} attempt="" solved={false}></Attempt>);
      }
    }
    return rows;
  };

  const Attempt = ({ attempt, solved }) => {
    let cells = [];
    for (let i = 0; i < 5; i++) {
      cells.push(
        <Cell key={i} index={i} attempt={attempt} solved={solved} secret={secret}>
          {attempt[i]}
        </Cell>
      );
    }

    return <Row>{cells}</Row>;
  };

  return (
    <Wrapper>
      <Title>WORDLE</Title>
      <GridWrapper>{renderGrid()}</GridWrapper>
    </Wrapper>
  );
}

export default App;
