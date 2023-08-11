import React, { useState } from "react";
import "../Nav/navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="icon">
        <a href="/">Shopper</a>
      </div>
      <ul>
        <li>
          <a href="/product">Products</a>
        </li>
      </ul>
      <div className="Admin_div">
        <div className="Admin_logo">
          <a href="/">Admin</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
