import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using Axios for API requests
import { AuthContext } from '../context/authContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData(); // Call fetchUserData as a function
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/User/${currentUser.id}'); // Replace '/api/user' with your actual API endpoint
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
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
            <Link className="link" to="/">Home</Link>
          </span>
          <span className="register">
            <Link className="link" to="/register">Register</Link>
          </span>
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
          <span>
            <Link className="link" to="/profile">
              {userData && userData.profilePicture ? (
                <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
              ) : (
                'Profile'
              )}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
