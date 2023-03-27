import { useState } from "react";

const Grid = ({ grid, onSquareClick }) => {
  return (
    <div className={"grid-container"}>
      {grid.map((row, rowIndex) =>
        row.map((isBlack, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`grid-square ${isBlack ? "black" : "white"}`}
            onMouseDown={() => onSquareClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
