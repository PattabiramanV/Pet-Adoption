import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import ProfileLogo from "../../assets/profile_icon_1.png";
import Profile from "./Profile";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set login status to true if token exists
    } else {
      setIsLoggedIn(false); // Set login status to false if token does not exist
    }
  }, []);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const openProfile = () => {
    setProfileOpen(true);
    setDropdownOpen(false);
  };

  const openSignup = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const handleHomepage = () => {
    navigate("/"); // Navigate to the home page
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login status to false
    navigate("/login"); // Navigate to the login page after logout
  };

  return (
    <section className="header_nav">
      <div className="header_main">
        <header className="header">
          <div className="logo">
            <img
              src={Logo}
              alt="Furry Friends Logo"
              onClick={handleHomepage}
              className="logo-image"
            />
          </div>

          <nav className="nav-links">
            <div
              className="user-profile"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>Features</span>
              {isDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-Features">
                  <a href="findpet">Reuniting lost pets</a>
                  <a href="PetGrooming">Pet Grooming</a>
                  <a href="pethostel">Pet Hostel</a>
                </div>
              )}
            </div>
            <a href="#Veterinarians">Veterinarians</a>
            <a href="#Add Pets">Add Pets</a>
            <a href="#Pets">Pets</a>
          </nav>

          <div className="nav-links_mobile">
            <div
              className="user-profile"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>☰</span>
              {isDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-left">
                  <a href="#Veterinarians">Veterinarians</a>
                  <a href="#Add Pets">Add Pets</a>
                  <a href="findpet">Reuniting lost pets</a>
                  <a href="#Pet Grooming">Pet Grooming</a>
                  <a href="pethostel">Pet Hostel</a>
                  <a href="#Pets">Pets</a>
                </div>
              )}
            </div>
          </div>

          {isLoggedIn ? ( // Render profile section if logged in
            <div className="user-section">
              <div
                className="user-profile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img src={ProfileLogo} alt="User" />
                <span>Samanta Smith</span>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <a onClick={openProfile}>Profile</a>
                    <a onClick={logout}>Logout</a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Render login/signup section if not logged in
            <div className="signup-profile">
              <button className="signup" onClick={openSignup}>
                <FontAwesomeIcon icon={faUser} className="signup-icon" />
                <span> Login | Register</span>
              </button>
            </div>
          )}

        </header>

        {isProfileOpen && (
          <div className="modal">
            <div className="modal-content">
              <Profile setProfileOpen={setProfileOpen} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
