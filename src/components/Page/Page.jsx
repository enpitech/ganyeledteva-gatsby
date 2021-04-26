import React from 'react';

export default function Page({ children }) {
  return <div className="bg-white">{children}</div>;
}

function Header({ children }) {
  return children ? <header>{children}</header> : null;
}

function Main({ children }) {
  return <main>{children}</main>;
}

Page.Header = Header;
Page.Main = Main;
