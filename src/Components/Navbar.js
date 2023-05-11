import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/Nav.css";

const Navbar = () => {
    return (
      <nav>
        <a className="logo">Environment Tacker</a>
        <ul className = "navBar">
          <li><Link to="/MapPage">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><a href="/">Close</a></li>
        </ul>
      </nav>
    );
  }
  

export default Navbar;