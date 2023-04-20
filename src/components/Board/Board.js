import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import { useState } from "react";

const Board = () => {
  // 6 rows, 7 columns

  const [boardArr, setBoardArr] = useState([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
  const [playerRed, setPlayerRed] = useState("R");
  const [playerYellow, setPlayerYellow] = useState("Y");
  const [currentPlayer, setCurrentPlayer] = useState(playerRed);
  const [gameOver, setGameOver] = useState(false);

  // columns are horizontal position
  // rows are vertical position

  function setPiece(rowCoord, columnCoord) {
    // with coords can change board state
    if (gameOver) {
      return;
    } // if game over, cannot set piece

    const boardCopy = [...boardArr]; // making copy to so can update it

    if (currentPlayer === playerRed) {
      boardCopy[rowCoord][columnCoord] = "red";
      setCurrentPlayer(playerYellow);
    } else if (currentPlayer === playerYellow) {
      boardCopy[rowCoord][columnCoord] = "yellow";
      setCurrentPlayer(playerRed);
    }
    // if red turn, change piece to red and make it yellow turn
    // if yellow turn, change piece to yellow turn

    setBoardArr(boardCopy); // updating board state
  }

  const tiles = [];

  const rows = 6;
  const columns = 7;

  for (let row = 0; row < rows; row++) {
    let rowArr = [];
    for (let column = 0; column < columns; column++) {
      rowArr.push(
        <Tile
          color={boardArr[row][column]}
          key={row + " " + column}
          id={row + "-" + column}
          setPiece={setPiece}
        />
      );
    }
    tiles.push(rowArr);
  }

  console.log("TILES", tiles);

  return <div className="board">{tiles}</div>;
};

export default Board;
