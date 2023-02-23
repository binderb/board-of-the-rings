import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className='navtitle'>
      <p >Board of The Rings</p></div>
      <ul>
        <li className="navlink"><Link to="/">Home</Link></li>
        <li className="navlink"><Link to="/Rules">Rules</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

