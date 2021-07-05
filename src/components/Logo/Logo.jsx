import React from "react";
import logo from "../../../static/logos/logo.png";

export default function Logo(props) {
  return (
    <a href="/">
      <img {...props} src={logo} alt="Logo" />
    </a>
  );
}
