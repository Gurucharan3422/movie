import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/Navbar.css'; // Import the external CSS file

const Navbar = () => {
  const { setLogin } = useContext(AuthContext);
  
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    setLogin(false);
  };

  // Toggle function for opening and closing the mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">MovieApp</h2>
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* You can replace this with an actual icon */}
      </div>
      <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li><Link to="/movies" className="nav-link">Movies</Link></li>
        <li><Link to="/playlist" className="nav-link">Playlist</Link></li>
      </ul>
      <button onClick={logout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;
