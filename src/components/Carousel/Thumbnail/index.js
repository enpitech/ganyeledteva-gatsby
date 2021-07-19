import React from "react";

const Thumbnail = ({ children, id, selectedKey }) => {
  const show = id === selectedKey;

  return (
    <div
      className={`display flex justify-center w-auto ${
        show
          ? "opacity-100 transition-all duration-1000 ease-in-out"
          : "opacity-0 h-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Thumbnail;
