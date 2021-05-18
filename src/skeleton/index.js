import React from "react";
import "./style.css";

const Skeleton = ({ width, height, margin = "none" }) => {
  return (
    <div
      style={{ width: width, height: height, margin: margin }}
      className="skeleton"
    />
  );
};

export default Skeleton;
