import React from "react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-white bg-white shadow-sm">
      <div className="container">
        <a href="./index.html" className="navbar-brand">
          <img src={logo} alt="" srcSet="" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
