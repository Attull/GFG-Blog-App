import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Blog App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/user">My Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;