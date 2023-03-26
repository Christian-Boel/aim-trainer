import { useState } from "react";

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4,100px)",
  gridTemplateRows: "repeat(4,100px)",
  gap: "5px",
};

const gridSquareStyle = (black) => ({
  backgroundColor: black ? "black" : "white",
  border: "1px solid #ccc",
  width: "100px",
  height: "100px",
});

const Grid = ({ grid, onSquareClick }) => {
  return (
    <div style={gridContainerStyle}>
      {grid.map((row, rowIndex) =>
        row.map((isBlack, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={gridSquareStyle(isBlack)}
            onClick={() => onSquareClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
