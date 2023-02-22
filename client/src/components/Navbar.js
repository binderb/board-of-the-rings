import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }} className="rounded bg-green-800 p-1 px-2 hover:bg-green-700"><Link to="/">Home</Link></li>
        <li style={{ marginRight: '1rem' }} className="rounded bg-green-800 p-1 px-2 hover:bg-green-700"><Link to="/Rules">Rules</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
