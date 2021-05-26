import React from 'react';

/* <blockqoute/> element  ref= https://www.coltborg.com/style-a-blockquote-using-tailwind-css/*/
const Blockquote = (props) => (
    <blockquote
      {...props}
      className="p-4 italic border-r-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote"
    >
      &ldquo;
      {props.children}
    </blockquote>
  );
  
  /* main style object, is passed to MDXRenderer  */
  const mdStyle = {
    h1: (props) => <h1 {...props} className="text-4xl" />,
    h2: (props) => (
      <h2
        {...props}
        className="border-r-4 border-purple-border mt-12 mb-5 pr-2 text-3xl font-normal"
      />
    ),
    p: (props) => <p {...props} className="mb-3" />,
    strong: (props) => <strong {...props} className="inline-block" />,
    ul: (props) => <ul {...props} className="list-disc list-outside mb-5 mr-5" />,
    ol: (props) => (
      <ol {...props} className="list-decimal list-outside mb-5 mr-5" />
    ),
    a: (props) => <a {...props} className="text-blue-500" />,
    blockquote: Blockquote,
  };

  export {mdStyle};