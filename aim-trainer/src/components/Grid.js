import { useState } from "react";

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4,120px)",
  gridTemplateRows: "repeat(4,120px)",
  gap: "5px",
};

const Grid = ({ grid, onSquareClick }) => {
  return (
    <div style={gridContainerStyle}>
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
