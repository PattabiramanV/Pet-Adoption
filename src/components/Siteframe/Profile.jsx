import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./Profile.css";

const Profile = ({ setProfileOpen }) => {
  const initialProfileState = {
    name: "Your Name",
    email: "yourname@example.com",
    gender: "Female",
    country: "Your Country",
    language: "English",
    state: "Your State",
    password: "********",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfileState);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setTempProfile({ ...profile });
    } else {
      setTempProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    console.log("Profile saved:", tempProfile);
  };

  const handleCancelClick = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handlePopClose = () => {
    setProfileOpen(false);
  };

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-close">
          <button className="pop_close_button" onClick={handlePopClose}>
            X
          </button>
        </div>
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/150" alt="Profile Avatar" />
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-row">
            <div className="profile-column">
              <label>Name</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="name"
                  value={tempProfile.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="profile-text">{profile.name}</p>
              )}
            </div>
            <div className="profile-column">
              <label>Email</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="email"
                  value={tempProfile.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="profile-text">{profile.email}</p>
              )}
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-column">
              <label>Gender</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="gender"
                  value={tempProfile.gender}
                  onChange={handleChange}
                />
              ) : (
                <p className="profile-text">{profile.gender}</p>
              )}
            </div>
            <div className="profile-column">
              <label>Country</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="country"
                  value={tempProfile.country}
                  onChange={handleChange}
                />
              ) : (
                <p className="profile-text">{profile.country}</p>
              )}
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-column">
              <label>Language</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="language"
                  value={tempProfile.language}
                  onChange={handleChange}
                />
              ) : (
                <p className="profile-text">{profile.language}</p>
              )}
            </div>
            <div className="profile-column">
              <label>State</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="state"
                  value={tempProfile.state}
                  onChange={handleChange}
                />
              ) : (
                <p className="profile-text">{profile.state}</p>
              )}
            </div>
          </div>
          {/* <div className="profile-row">
            <div className="profile-column">
              <label>Password</label>
              {isEditing ? (
                <Input.Password
                  type="password"
                  name="password"
                  value={tempProfile.password}
                  onChange={handleChange}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              ) : (
                <p className="profile-text">{profile.password}</p>
              )}
            </div>
          </div> */}
        </div>
        {isEditing ? (
          <Space>
            <Button type="primary" onClick={handleSaveClick}>
              Save
            </Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </Space>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
      </div>
    </section>
  );
};

export default Profile;
