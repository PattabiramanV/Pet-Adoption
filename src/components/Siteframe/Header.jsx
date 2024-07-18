import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import Logo from "../../assets/Logo.png";
import ProfileLogo from "../../assets/profile_icon_1.png";
import Profile from "./Profile";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost/Pet-Adoption/Backend/profile/read_profile.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Access denied. Invalid token.") {
        logout();
      } else {
        setProfile(response.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

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

  const closeProfile = () => {
    setProfileOpen(false);
  };

  const openSignup = () => {
    navigate("/signup");
  };

  const handleHomepage = () => {
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <section className="header_nav">
      <div className="header_main">
        <header className="header">
          <div className="logo" onClick={handleHomepage}>
            <img src={Logo} alt="Furry Friends Logo" className="logo-image" />
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
            <a href="Veterinary">Veterinarians</a>
            <a href="#Add Pets">Add Pets</a>
            <a href="pets">Pets</a>
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
                  <a href="Veterinary">Veterinarians</a>
                  <a href="#Add Pets">Add Pets</a>
                  <a href="findpet">Reuniting lost pets</a>
                  <a href="PetGrooming">Pet Grooming</a>
                  <a href="pethostel">Pet Hostel</a>
                  <a href="pets">Pets</a>
                </div>
              )}
            </div>
          </div>

          {isLoggedIn && profile ? (
            <div className="user-section">
              <div
                className="user-profile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img src={ProfileLogo} alt="User" className="profile-image" />
                <span>{profile.username}</span> {/* Display user's name */}
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <a onClick={openProfile}>Profile</a>
                    <a onClick={logout}>Logout</a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="signup-profile">
              <button className="signup" onClick={openSignup}>
                <FontAwesomeIcon icon={faUser} className="signup-icon" />
                <span> Login | Register</span>
              </button>
            </div>
          )}
        </header>

        <Modal
          title="Profile"
          style={{ top: 15 }}
          visible={isProfileOpen}
          onCancel={closeProfile}
          footer={null}
        >
          <Profile setProfileOpen={setProfileOpen} />
        </Modal>
      </div>
    </section>
  );
};

export default Header;
