import React, { useState, useEffect, useCallback } from "react";
import Grid from "./components/Grid";
import "./App.css";

const initialGrid = () => {
  const grid = new Array(4).fill(null).map(() => new Array(4).fill(false));
  return grid;
};

const randomizeBlackSquares = (grid, count = 0, lastClickedSquare = null) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  let blackSquares = 3;

  while (count < blackSquares) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);

    if (
      !newGrid[row][col] &&
      (lastClickedSquare === null ||
        lastClickedSquare.row !== row ||
        lastClickedSquare.col !== col)
    ) {
      newGrid[row][col] = true;
      count++;
    }
  }
  return newGrid;
};

const App = () => {
  const [squares, setSquares] = useState(initialGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [scorePerMinute, setScorePerMinute] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    setSquares(randomizeBlackSquares(squares));
  }, []);

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const onSquareClick = (rowIndex, colIndex) => {
    if (!gameOver) {
      if (squares[rowIndex][colIndex]) {
        const newSquares = JSON.parse(JSON.stringify(squares));
        newSquares[rowIndex][colIndex] = false;
        setSquares(
          randomizeBlackSquares(newSquares, 2, {
            row: rowIndex,
            col: colIndex,
          })
        );
        setScore(score + 1);
      } else {
        setMisses(misses + 1);
      }
      setAccuracy((score / (score + misses)) * 100);
      setScorePerMinute(score / (selectedDuration - timeLeft));
    }
  };

  const resetGame = () => {
    setSquares(randomizeBlackSquares(initialGrid(), 0, null));
    setScore(0);
    setGameOver(false);
    setTimeLeft(selectedDuration);
    setMisses(0);
    setAccuracy(100);
  };
  return (
    <div>
      <h1>Aim Trainer</h1>
      <h2>Time left: {timeLeft}</h2>
      <Grid grid={squares} onSquareClick={onSquareClick} />
      <h3>
        {" "}
        <strong>Score:</strong> {score} <br></br>
        <strong>Misses: {misses}</strong> <br></br>
        <strong>Accuracy: {accuracy.toFixed(0)}% </strong> <br></br>
        <strong>Score per minute: {scorePerMinute.toFixed(2)}</strong>
      </h3>
      <label htmlFor="duration-slider">
        Game duration: {selectedDuration} seconds
      </label>
      <input
        type="range"
        id="duration-slider"
        min="5"
        max="100"
        value={selectedDuration}
        onChange={handleDurationChange}
      ></input>
      {gameOver && <h3>Game Over</h3>}
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default App;
