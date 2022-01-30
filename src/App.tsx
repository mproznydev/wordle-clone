import { useEffect, useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';

const word = 'MICRO';

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

const Cell = styled.div<{ letterStatus?: string; isCurrentCell?: boolean }>`
  width: 70px;
  height: 70px;
  border: 2px solid ${({ theme }) => theme.colors.darkmode.colorTone3};
  border: ${({ theme, isCurrentCell }) =>
    isCurrentCell ? `2px solid ${theme.colors.darkmode.colorTone2}` : `2px solid ${theme.colors.darkmode.colorTone3}`};
  margin: 0.15rem;
  color: ${({ theme }) => theme.colors.darkmode.colorTone1};
  font-size: 2rem;
  background-color: ${({ letterStatus }) => letterStatus};
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: 70px;
  animation: cellAnimation 0.15s cubic-bezier(0.39, 0.575, 0.565, 1) both;

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

const Title = styled.h1`
  color: #d7dadc;
  margin: 1rem;
`;

interface GridProps {
  index: number;
  history: string[];
  currentAttempt: string;
}

const Grid = ({ index, history, currentAttempt }: GridProps) => {
  const finished = index < history.length;
  const current = index === history.length;

  const letterStatus = (i: number): string => {
    const isCorrectAndRightOrder = history[index][i] === word[i];
    const isCorrectAndWrongOrder = word.includes(history[index][i]);

    if (isCorrectAndRightOrder) {
      return '#538d4e';
    } else if (isCorrectAndWrongOrder) {
      return '#b59f3b';
    } else {
      return '#3a3a3c';
    }
  };

  if (finished) {
    return (
      <Row>
        {Array.from({ length: 5 }).map((_, i) => (
          <Cell key={i} letterStatus={letterStatus(i)}>
            {history[index][i]}
          </Cell>
        ))}
      </Row>
    );
  } else if (current) {
    return (
      <Row>
        {Array.from({ length: 5 }).map((_, i) => {
          const isCurrentCell = i < currentAttempt.length;
          return (
            <Cell key={i} isCurrentCell={isCurrentCell}>
              {currentAttempt[i]}
            </Cell>
          );
        })}
      </Row>
    );
  } else {
    return (
      <Row>
        {Array.from({ length: 5 }).map((_, i) => (
          <Cell key={i}></Cell>
        ))}
      </Row>
    );
  }
};

function App() {
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [history, setHistory] = useState([]);
  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
  });

  const handlePressKey = (e: any) => {
    if (currentAttempt.length < 5 && e.keyCode >= 65 && e.keyCode <= 90) {
      setCurrentAttempt(currentAttempt + e.key.toUpperCase());
    }
    if (e.key === 'Backspace') {
      setCurrentAttempt(currentAttempt.slice(0, currentAttempt.length - 1));
    }
    if (e.key === 'Enter') {
      if (currentAttempt.length === 5) {
        setHistory([...history, currentAttempt]);
        if (currentAttempt === word) {
          setTimeout(() => {
            alert('you won');
          }, 0);
        }
        setCurrentAttempt('');
      }
    }
  };

  return (
    <Wrapper>
      <Title>Wordle</Title>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid key={i} index={i} history={history} currentAttempt={currentAttempt}></Grid>
      ))}
    </Wrapper>
  );
}

export default App;
