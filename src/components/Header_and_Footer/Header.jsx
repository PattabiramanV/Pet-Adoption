import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import ProfileLogo from "../../assets/profile_icon_1.png";
import Profile from "./Profile";
// import './Profile.css';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

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

  return (
    <section className="headr_nav">
      <div className="header_main">
        <header className="header">
          <div className="logo">
            <img src={Logo} alt="Furry Friends Logo" />
          </div>

          <nav className="nav-links">
            <div className="nav-links">
              <div
                className="user-profile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>Features</span>
                {isDropdownOpen && (
                  <div className="dropdown-menu dropdown-menu-Features">
                    <a href="#Reuniting lost pets">Reuniting lost pets</a>
                    <a href="#Pet Grooming">Pet Grooming</a>
                    <a href="#Pet Hostel">Pet Hostel</a>
                  </div>
                )}
              </div>
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
                  <a href="#Reuniting lost pets">Reuniting lost pets</a>
                  <a href="#Pet Grooming">Pet Grooming</a>
                  <a href="#Pet Hostel">Pet Hostel</a>
                  <a href="#Pets">Pets</a>
                </div>
              )}
            </div>
          </div>

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
                  <a href="#logout">Logout</a>
                </div>
              )}
            </div>
          </div>
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
