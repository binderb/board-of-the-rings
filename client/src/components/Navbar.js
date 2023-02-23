import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center bg-green-900 p-2">
      <div className='navtitle text-[30px] p-0'>
      Board of The Rings
      </div>
      <div>
        <Link className="btn btn-primary m-1 no-underline" to="/">Home</Link>
        <Link className="btn btn-primary m-1 no-underline" to="/Rules">Rules</Link>
      </div>
    </nav>
  );
}

export default Navbar;

