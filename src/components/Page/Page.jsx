import React from 'react';

export default function Page({ children }) {
  return <div>{children}</div>;
}

function Header({ children }) {
  return <header>{children}</header>;
}

function Main({ children }) {
  return <main>{children}</main>;
}

Page.Header = Header;
Page.Main = Main;
