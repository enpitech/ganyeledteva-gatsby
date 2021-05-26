import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import {mdStyle} from "../../styles/mdxStyles"


export default function Page({ children }) {
  return <div className="bg-white">{children}</div>;
}

function Header({ children }) {
  return children ? <header>{children}</header> : null;
}

function Main({ children }) {
// return <main>{children}</main>;
return <main><MDXProvider components={mdStyle}>{children}</MDXProvider></main>;
}

Page.Header = Header;
Page.Main = Main;
