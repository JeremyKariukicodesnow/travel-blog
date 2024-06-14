import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="links">
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              Categories
            </button>
            <div className={`dropdown-content ${dropdownVisible ? 'show' : ''}`}>
              <Link to="/?cat=art">ART</Link>
              <Link to="/?cat=science">SCIENCE</Link>
              <Link to="/?cat=technology">TECHNOLOGY</Link>
              <Link to="/?cat=cinema">CINEMA</Link>
              <Link to="/?cat=design">DESIGN</Link>
              <Link to="/?cat=food">FOOD</Link>
            </div>
          </div>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}
          <span className="home">
            <Link className="link" to="/">home</Link>
          </span>
          <span className="register">
            <Link className="link" to="/register">Register</Link>
          </span>
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
