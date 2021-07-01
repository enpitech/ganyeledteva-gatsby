import React, {  useEffect } from 'react';
import Thumbnail from '../Thumbnail';
import DotIcon from '../DotIcon';

const Carousel = ({ children, time }) => {
  const [index, setIndex] = React.useState(0);
  const keys = children.map((child, index) => index);

  useEffect(() => {
    const interval = setInterval(() => {
      moveToNextItem()
    }, time);
    return () => clearInterval(interval);
  });

  useEffect(()=>{
    if(time<1000) time=1000
  },time)


  const moveToNextItem = () => {
    const newIndex = (index + 1) % keys.length;
    setIndex(newIndex);
  }

  const moveToPreviousItem = () => {
    let newIndex = (index - 1) % keys.length;
    if ( newIndex < 0 ) newIndex = keys.length - 1
    setIndex(newIndex);
  }


  
  const _slides = () => {
    return children.map((child, idx) => (
      <Thumbnail key={idx} id={idx} selectedKey={index}>
        {child}
      </Thumbnail>
    ));
  }

  const _sliderDots = () => {
    return keys.map(key => (
      <span key={key} onClick={() => setIndex(key)}>
        {<DotIcon selected={key === index} />}
      </span>
    ));
  }

  return (
    <div className="p-5 m-auto flex justify-center">
      <div className="grid grid-flow-row auto-rows-max">
        <div className='flex flex-row justify-center'>
        <button className='focus:outline-none' onClick={moveToNextItem}>          <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg></button>
        <div className="min-h-100 ">
          { _slides() }
        </div>
        <button onClick={moveToPreviousItem} className='focus:outline-none'>          <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg></button>
        </div>
        <div className="flex justify-center mt-2">
          { _sliderDots() }
        </div>
      </div>
    </div>
  );
}

export default Carousel;