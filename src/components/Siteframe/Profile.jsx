import React, { useState, useEffect } from "react";
import { Button, Input, Space, Form } from "antd";
import axios from "axios";
import "./Profile.css";

const Profile = ({ setProfileOpen }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");   // headers: { Authorization: `Bearer ${token}` }
        return;
      }

      try {
        const response = await axios.get('http://localhost/Pet-Adoption/Backend/profile/read_profile.php', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async (values) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost/Pet-Adoption/Backend/profile/update_profile.php',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Success:', response.data);
      setProfile(values); // Update profile state with form values
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Exit edit mode without saving
  };

  const handlePopClose = () => {
    setProfileOpen(false);
  };

  return (
    <section className="profile-page">
      <div className="profile-container">
          {/* <div className="profile-close">
            <button className="pop_close_button" onClick={handlePopClose}>
              ❌
            </button>
          </div> */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/150" alt="Profile Avatar" />
          </div>
          <div className="profile-info">
            <h2>{profile.username}</h2>
            <p>{profile.email}</p>
          </div>
        </div>
        <div className="profile-details">
          <Form
            layout="vertical"
            onFinish={handleSaveClick}
            initialValues={profile}
            hideRequiredMark={!isEditing}
          >
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="Username" name="username">
                  {isEditing ? (
                    <Input />
                  ) : (
                    <p className="profile-text">{profile.username}</p>
                  )}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="Email" name="email">
                  {isEditing ? (
                    <Input />
                  ) : (
                    <p className="profile-text">{profile.email}</p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="Phone" name="phone">
                  {isEditing ? (
                    <Input />
                  ) : (
                    <p className="profile-text">{profile.phone}</p>
                  )}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="Gender" name="gender">
                  {isEditing ? (
                    <Input />
                  ) : (
                    <p className="profile-text">{profile.gender}</p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="State" name="state">
                  {isEditing ? (
                    <Input />
                  ) : (
                    <p className="profile-text">{profile.state}</p>
                  )}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="City" name="city">
                  {isEditing ? (
                    <Input />
                  ) : (
                    <p className="profile-text">{profile.city}</p>
                  )}
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              {isEditing ? (
                <Space>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button onClick={handleCancelClick}>Cancel</Button>
                </Space>
              ) : (
                <Button onClick={handleEditClick}>Edit</Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
