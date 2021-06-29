import React from 'react';
import { classNames } from '../../../utils';

export default function ReasonBtn({ content, active, onClick, className }) {
  return (
    <button
      type="button"
      className={classNames(
        active ? 'bg-purple-light-border' : 'bg-gray-300',
        `inline-flex items-center justify-center
         px-6 py-3 border border-transparent
        font-medium rounded-md shadow-sm text-white
        hover:bg-purple-light-border focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:bg-purple-light-border sm:p-6
        w-full md:w-1/4 h-1/4 md:h-36  text-2xl`,
        className
      )}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
