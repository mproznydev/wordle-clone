import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 0.5rem;
`;
const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Attempt = styled.div``;

function App() {
  const [currentAttempt, setCurrentAttempt] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
  });

  const handlePressKey = (e) => {
    if (currentAttempt.length < 5 && e.keyCode >= 65 && e.keyCode <= 90) {
      setCurrentAttempt([...currentAttempt, e.key]);
    }
    if (e.key === 'Backspace') {
      setCurrentAttempt(currentAttempt.slice(0, currentAttempt.length - 1));
    }
    if (e.key === 'Enter') {
      if (currentAttempt.length === 5) {
        setHistory(currentAttempt.join(''));
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
      cells.push(<Cell key={i} index={i} attempt={attempt} solved={solved}></Cell>);
    }
    return <Row>{cells}</Row>;
  };

  return (
    <Wrapper>
      <h1>Wordle</h1>
      <GridWrapper>{renderGrid()}</GridWrapper>
    </Wrapper>
  );
}

export default App;
