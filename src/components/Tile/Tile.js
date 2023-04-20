import React from "react";
import "./Tile.css";

const Tile = ({ color, id, setPiece }) => {
  // console.log(id);

  let coords = id.split("-");
  let rowCoord = Number(coords[0]);

  let columnCoord = Number(coords[1]);

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
      }}
      onClick={() => setPiece(rowCoord, columnCoord)}
    ></div>
  );
};

export default Tile;
