import React, { useState, useEffect } from "react";
import { Modal, Button, notification } from "antd";
import Logo from "../../assets/Logo.png";
import Profile from "./Profile";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMap, faLocationArrow, faSignOutAlt,faMapMarkerAlt ,faPaw,faRunning,faShoppingCart,faBoxOpen ,faMapSigns} from "@fortawesome/free-solid-svg-icons";
import { faUser, faUserCircle, faIdBadge, faAddressCard } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import Avatar from "@mui/material/Avatar"; // Import Material-UI Avatar component

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
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
        console.log("Profile data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      notification.error({
        message: "Error fetching profile",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const closeProfile = async () => {
    setProfileOpen(false);
    console.log("Modal closed, fetching profile data...");
    fetchProfile();
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

  const openSignup = () => {
    navigate("/login");
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
        <Loader />
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
            {/* Pet-Spotlight */}
            <div
              className="user-profile Pet-Spotlight"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>Pet Spotlight</span>
              {isDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-Features">
                <Link className="menu" to="/findpet">
                  Add lost pets
                </Link>
                <Link className="menu" to="/lostingpet">
             Lost pets
                </Link>
                <Link className="menu" to="/mypetlostpost">
                  Found Pets
                </Link>
                <Link className="menu" to="/lostingusertable">
                My Entries
                </Link>
              </div>
              )}
            </div>

            {/* Pet-Expertise */}
            <div
              className="user-profile Pet-Expertise"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>Pet Expertise</span>
              {isDropdownOpen && (
               <div className="dropdown-menu dropdown-menu-Features">
               <Link className="menu" to="/Veterinary">
               Veterinarians
               </Link>
               <Link className="menu" to="/doctoraddform">
                Add Veterinarians
               </Link>
               <Link className="menu" to="/PetGrooming">
                Apply for Grooming
               </Link>
               {/* <Link className="menu" to="/groomingusertable">
              Patinent info
               </Link> */}
               <Link className="menu" to="/venterinarytables">
               Service Records
               </Link>
               {/* <Link className="menu" to="/">
               Doctor Registration       
                           </Link> */}
           
             </div>
              )}
            </div>

            {/* Pet-Haven */}
            <div
              className="user-profile Pet-Haven"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>Pet Haven</span>
              {isDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-Features">
                  <Link className="menu" to="/pets">
                  Home Finder
                  </Link>
                  <Link className="menu" to="/sale">
                    Add Forms Pet
                  </Link>
                  <Link className="menu" to="/adopte">
                  Pet Showcase
                  </Link>
                 
                  <Link className="menu" to="/tables">
                  My Pet Lists
                  </Link>
                </div>
              )}
            </div>

            {/* Pet-Oasis */}
            <div
              className="user-profile Pet-Oasis"
              onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            >
              <span>Pet Oasis</span>
              {isDropdownOpen && (
               <div className="dropdown-menu dropdown-menu-Features">
               <Link className="menu" to="/pethostel">
                 Hostel Listings
               </Link>
               <Link className="menu" to="/addhostel">
                 Register Hostel
               </Link>
               {/* <Link className="menu" to="/hostelusertable">
                 Owner Details
               </Link> */}
               <Link className="menu" to="pethostel/booking">
                 Manage Reservations
               </Link>
               <Link className="menu" to="/hosteldeteils/">
                 Client Profiles
               </Link>
             </div>
              )}
            </div>

            <div className="">
                  <Link to="/map"><span><FontAwesomeIcon icon={faLocationArrow} className="signup-icon" /></span> Epic Nearby</Link>
                </div>



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
                <Avatar
                  alt="User"
                  src={profile?.avatar || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"}
                  className="profile-image"
                />
                <span className="profile_name">{profile.username}</span>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <a onClick={openProfile}><span><FontAwesomeIcon icon={faAddressCard} className="signup-icon" /></span> Profile</a>
                    <Link to={`tables`}><span><FontAwesomeIcon icon={faShoppingCart} className="signup-icon" /></span>  Activity</Link>


                    <a onClick={logout}><span> <FontAwesomeIcon icon={faSignOutAlt} className="signup-icon" /></span>  Logout</a>                   
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
          style={{ top: 10 }}
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
