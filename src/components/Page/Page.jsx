import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { mdStyle } from '../../styles/mdxStyles';

export default function Page({ children, style }) {
  return (
    <div className="bg-white" style={style}>
      {children}
    </div>
  );
}

function Header({ children, className }) {
  return children ? <header className={className}>{children}</header> : null;
}

function Main({ children, className }) {
  return (
    <main className={className}>
      <MDXProvider components={mdStyle}>{children}</MDXProvider>
    </main>
  );
}

Page.Header = Header;
Page.Main = Main;
