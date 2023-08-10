import React, { useState } from "react";
import "../Nav/navbar.css";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevValue) => !prevValue);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="Navbar">
      <div className="icon">
        <a href="/">Shopper</a>
      </div>
      <ul>
        {/* <li>
          <a href="/dashboard">Dashboard</a>
        </li> */}
        <li>
          <a href="/product">Products</a>
        </li>
        {/* <li>
          <a href="#contact">Categories</a>
        </li> */}
      </ul>
      <div className="Admin_div">
        <div className="Admin_logo" onClick={toggleDropdown}>
          logo
          {showDropdown && (
            <div className="dropdown" onMouseLeave={closeDropdown}>
              <ul>
                <li>
                  <a href="#profile">Profile</a>
                </li>
                <li>
                  <a href="#settings">Settings</a>
                </li>
                <li>
                  <a href="#logout">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
