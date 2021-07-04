import React, { useEffect } from "react";
import Thumbnail from "./Thumbnail";
import DotIcon from "./DotIcon";
import arrowRightIcon from "~static/img/pics/icons/arrow_right.svg";
import arrowLeftIcon from "~static/img/pics/icons/arrow_left.svg";

const Carousel = ({ children, time }) => {
  const [currItemIndex, setIndex] = React.useState(0);
  const keys = children.map((child, index) => index);
  const MIN_TIME = 1000; //if time == 0 then carousel starts flickering, so set minimum time

  useEffect(() => {
    const interval = setInterval(moveToNextItem, time);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (time < MIN_TIME) {
      time = MIN_TIME;
    }
  }, [time]);

  const moveToNextItem = () => {
    const nextItemIndex = (currItemIndex + 1) % keys.length;
    setIndex(nextItemIndex);
  };

  const moveToPreviousItem = () => {
    let nextItemIndex = (currItemIndex - 1) % keys.length;
    if (nextItemIndex < 0) {
      nextItemIndex = keys.length - 1;
    }
    setIndex(nextItemIndex);
  };

  const slides = () => {
    return children.map((child, idx) => (
      <Thumbnail key={idx} id={idx} selectedKey={currItemIndex}>
        {child}
      </Thumbnail>
    ));
  };

  const sliderDots = () => {
    return keys.map((key) => (
      <span key={key} onClick={() => setIndex(key)}>
        <DotIcon selected={key === currItemIndex} />
      </span>
    ));
  };

  return (
    <div className="p-5 m-auto flex justify-center">
      <div className="grid grid-flow-row auto-rows-max">
        <div className="flex flex-row justify-center">
          <button className="focus:outline-none" onClick={moveToNextItem}>
            <img className="h-10 w-10" src={arrowRightIcon} />
          </button>
          <div className="min-h-100 ">{slides()}</div>
          <button onClick={moveToPreviousItem} className="focus:outline-none">
            <img className="h-10 w-10" src={arrowLeftIcon} />
          </button>
        </div>
        <div className="flex justify-center mt-2">{sliderDots()}</div>
      </div>
    </div>
  );
};

export default Carousel;
