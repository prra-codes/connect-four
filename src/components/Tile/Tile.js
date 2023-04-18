import React from "react";
import "./Tile.css";

const Tile = ({ color }) => {
  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
      }}
    ></div>
  );
};

export default Tile;
