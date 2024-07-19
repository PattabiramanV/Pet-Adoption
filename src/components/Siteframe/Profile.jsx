import React, { useState, useEffect } from "react";
import { Button, Input, Space, Form, Select, notification } from "antd";
import axios from "axios";
import "./Profile.css";

const { Option } = Select;

const Profile = ({ setProfileOpen }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get('http://localhost/Pet-Adoption/Backend/profile/read_profile.php', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        notification.error({ message: 'Error fetching profile', description: error.message });
      }
    };

    fetchProfile();
  }, [form]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (values) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost/Pet-Adoption/Backend/profile/update_profile.php',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log('Success:', response.data);
      setProfile(values); // Update profile state with form values
      setIsEditing(false); // Exit edit mode
      notification.success({ message: 'Profile updated successfully' });
    } catch (error) {
      // console.error('Error:', error);
      notification.error({
        message: 'Please try again and check the input fields.'
      });
      
      // notification.error({ message: 'Error updating profile', description: error.response ? error.response.data.message : error.message });
    }
  };
  

  const handleCancelClick = () => {
    setIsEditing(false); // Exit edit mode without saving
    form.setFieldsValue(profile); // Reset form values to the original profile state
  };

  // const handlePopClose = () => {
  //   setProfileOpen(false);
  // };

  return (
    <section className="profile-page">
      <div className="profile-container">
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
            form={form}
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
                    <Select>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
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
