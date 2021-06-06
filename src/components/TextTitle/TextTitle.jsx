import React from 'react';

const TextTitle = ({ title, className }) => (
  <h1 className={`text-4xl mb-2 text-purple-header ${className}`}>{title}</h1>
);

export default TextTitle;
