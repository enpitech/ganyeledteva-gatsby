import React from 'react';
import Page from './Page';

export default function PageHeader({
  title,
  subtitle,
  backgroundColorClass,
  backgroundPatternClass,
}) {
  if (!title) return null;

  return (
    <Page.Header>
      <div className={`${backgroundColorClass || 'bg-green-gradient'} `}>
        <div
          className={`font-normal	 flex flex-col items-center justify-center h-auto py-12 ${
            backgroundPatternClass || 'bg-patt2'
          }`}
        >
          <h1 className="text-5xl text-center mb-4">{title}</h1>

          {subtitle ? (
            <h2 className="text-lg text-center max-w-3xl ">{subtitle}</h2>
          ) : null}
        </div>
      </div>
    </Page.Header>
  );
}
