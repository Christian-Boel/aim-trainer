import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";

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

  useEffect(() => {
    setSquares(randomizeBlackSquares(squares));
  }, []);

  const onSquareClick = (rowIndex, colIndex) => {
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
    }
  };

  const resetGame = () => {
    setSquares(randomizeBlackSquares(initialGrid(), 0, null));
    setScore(0);
  };
  return (
    <div>
      <h1>Aim trainer</h1>
      <Grid grid={squares} onSquareClick={onSquareClick} />
      <p>Score: {score}</p>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default App;
