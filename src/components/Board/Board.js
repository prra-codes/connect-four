import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import { useState } from "react";
import Confetti from "react-confetti";

const Board = () => {
  const [boardArr, setBoardArr] = useState([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);

  const [playerRed, setPlayerRed] = useState("Red");
  const [playerYellow, setPlayerYellow] = useState("Yellow");
  const [currentPlayer, setCurrentPlayer] = useState(playerRed);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const [currColumns, setCurrColumns] = useState([5, 5, 5, 5, 5, 5, 5]); // array to mark the height of each column, starts at bottom row

  function setPiece(y, x) {
    if (gameOver) {
      return;
    } // if game over, cannot set piece

    const currColumnsCopy = [...currColumns];

    y = currColumnsCopy[x];
    // gets row of specific column

    if (y < 0) {
      return;
    } // if r < 0, means column is filled, so cannot place piece

    const boardCopy = [...boardArr]; // making copy so board can be updated

    if (currentPlayer === playerRed) {
      boardCopy[y][x] = "Red";
      setCurrentPlayer(playerYellow);
    } else if (currentPlayer === playerYellow) {
      boardCopy[y][x] = "Yellow";
      setCurrentPlayer(playerRed);
    }

    setBoardArr(boardCopy); // updating board state

    currColumnsCopy[x] = y - 1; // so row moves up by 1 row

    setCurrColumns(currColumnsCopy); // updating columns

    checkWinner();
  }

  const tiles = [];

  const ySize = 6;
  const xSize = 7;

  function checkWinner() {
    // horizontally

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize - 3; x++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y][x + 1] &&
            boardArr[y][x + 1] === boardArr[y][x + 2] &&
            boardArr[y][x + 2] === boardArr[y][x + 3]
          ) {
            decideWinner(y, x);
            return;
            // don't have to check vertically or diagonally when we've found a connect 4 horizontally
          }
        }
      }
    }

    // vertically

    for (let x = 0; x < xSize; x++) {
      for (let y = 0; y < ySize - 3; y++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y + 1][x] &&
            boardArr[y + 1][x] === boardArr[y + 2][x] &&
            boardArr[y + 2][x] === boardArr[y + 3][x]
          ) {
            decideWinner(y, x);
            return; // don't have to check diagonally or anti-diagonally when we've found a connect 4 vertically
          }
        }
      }
    }

    // anti diagonally

    for (let y = 0; y < ySize - 3; y++) {
      for (let x = 0; x < xSize - 3; x++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y + 1][x + 1] &&
            boardArr[y + 1][x + 1] === boardArr[y + 2][x + 2] &&
            boardArr[y + 2][x + 2] === boardArr[y + 3][x + 3]
          ) {
            decideWinner(y, x);
            return; // don't have to check diagonally when we've found a connect 4 anti-diagonally
          }
        }
      }
    }

    // diagonally

    for (let y = 3; y < ySize; y++) {
      for (let x = 0; x < xSize - 3; x++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y - 1][x + 1] &&
            boardArr[y - 1][x + 1] === boardArr[y - 2][x + 2] &&
            boardArr[y - 2][x + 2] === boardArr[y - 3][x + 3]
          ) {
            decideWinner(y, x);
            return;
          }
        }
      }
    }
  }

  function decideWinner(y, x) {
    if (boardArr[y][x] === playerRed) {
      setWinner(playerRed);
      setGameOver(true);
    } else {
      setWinner(playerYellow);
      setGameOver(true);
    }
  }
  function newGame() {
    setBoardArr([
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ]);
    setCurrColumns([5, 5, 5, 5, 5, 5, 5]);
    setGameOver(false);

    if (winner === playerRed) {
      setCurrentPlayer(playerYellow);
    } else if (winner === playerYellow) {
      setCurrentPlayer(playerRed);
    }

    setWinner(null);
  }

  for (let y = 0; y < ySize; y++) {
    let rowArr = [];
    for (let x = 0; x < xSize; x++) {
      rowArr.push(
        <Tile
          color={boardArr[y][x]}
          key={y + " " + x}
          id={y + "-" + x}
          setPiece={setPiece}
        />
      );
    }
    tiles.push(rowArr);
  }
  const confettiStyles = {
    width: "100%",
    height: "100%",
  };
  return (
    <div>
      {" "}
      {gameOver && <Confetti style={confettiStyles} />}
      <div>
        <button className="new-game" onClick={newGame}>
          NEW GAME
        </button>
      </div>
      <div className="winner-text">
        {" "}
        {winner === null ? (
          <h2> Player {currentPlayer} Turn</h2>
        ) : winner === playerRed ? (
          <h2 className="red-text"> Player Red Wins! Loser starts next 😏</h2>
        ) : (
          <h2 className="yellow-text">
            Player Yellow Wins! Loser starts next 😏
          </h2>
        )}
      </div>
      <div className="board">{tiles}</div>
    </div>
  );
};

export default Board;
