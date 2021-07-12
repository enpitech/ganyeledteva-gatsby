import React from "react";

const Thumbnail = ({ children, id, selectedKey }) => {
  const show = toShow(id, selectedKey); //id === selectedKey;

  return (
    <div
      className={`display flex justify-center w-1/3 ${
        show
          ? "opacity-100 transition-all duration-1000 ease-in-out m-auto"
          : "opacity-0 h-0"
      }`}
    >
      <h1>{show && `${id} || ${selectedKey}`}</h1>
      {children}
    </div>
  );
};

export default Thumbnail;

const toShow = (id, selectedKey) => {
  return id - 1 <= selectedKey <= id + 1;
};
