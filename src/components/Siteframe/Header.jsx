import React, { useState, useEffect } from "react";
import { Modal, Button, notification } from "antd";
import Logo from "../../assets/Logo.png";
import ProfileLogo from "../../assets/profile_icon_1.png";
import Profile from "./Profile";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader"; // Import Loader component

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
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

    setLoading(true); // Show loader
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROFILE_BASE_URL}read_profile.php`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Access denied. Invalid token.") {
        logout();
      } else {
        setProfile(response.data);
        setIsLoggedIn(true);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      notification.error({ message: 'Error fetching profile', description: error.message });
    } finally {
      setLoading(false); // Hide loader
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

  if (loading) {
    return (
      <div className="loading-container">
        <Loader /> {/* Use your custom loader component */}
      </div>
    );
  }

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
                  <Link className="menu" to="/findpet">Reuniting lost pets</Link>
                  <Link className="menu" to="/PetGrooming">Pet Grooming</Link>
                  <Link className="menu" to="/pethostel">Pet Hostel</Link>
                </div>
              )}
            </div>
            <Link to="/Veterinary">Veterinarians</Link>
            <Link to="/add-pets">Add Pets</Link>
            <Link to="/pets">Pets</Link>
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
                  <Link to="/Veterinary">Veterinarians</Link>
                  <Link to="/add-pets">Add Pets</Link>
                  <Link to="/findpet">Reuniting lost pets</Link>
                  <Link to="/PetGrooming">Pet Grooming</Link>
                  <Link to="/pethostel">Pet Hostel</Link>
                  <Link to="/pets">Pets</Link>
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
                <img
                  src={profile.avatar || ProfileLogo}
                  alt="User"
                  className="profile-image"
                />
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
          open={isProfileOpen}
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
