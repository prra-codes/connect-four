import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import { useState } from "react";

const Board = () => {
  // 6 rows, 7 columns

  const [boardArr, setBoardArr] = useState([
    [null, null, null, null, null, null, null],
    [null, "red", null, null, null, null, null],
    [null, null, null, "yellow", null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);

  // columns are horizontal position
  // rows are vertical
  const tiles = [];

  const rows = 6;
  const columns = 7;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      tiles.push(
        <Tile color={boardArr[row][column]} key={row + " " + column} />
      );
    }
  }

  return <div className="board">{tiles}</div>;
};

export default Board;
