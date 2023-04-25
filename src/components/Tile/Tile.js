import React from "react";
import "./Tile.css";

const Tile = ({ color, id, setPiece }) => {
  let coords = id.split("-");
  let y = Number(coords[0]);

  let x = Number(coords[1]);

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
      }}
      title={id}
      onClick={() => setPiece(y, x)}
    ></div>
  );
};

export default Tile;
