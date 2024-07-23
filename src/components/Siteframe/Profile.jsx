import React, { useState, useEffect } from "react";
import { Button, Input, Space, Form, Select, notification } from "antd";
import axios from "axios";
import "./Profile.css";

let { Option } = Select;

let Profile = ({ setProfileOpen }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get('http://localhost/petadoption/backend/profile/read_profile.php', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        form.setFieldsValue(response.data);
        setImageUrl(response.data.avatar ? `http://localhost/petadoption/backend/profile/uploads/${response.data.avatar}` : ''); // Handle the case where there might not be an avatar
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
        'http://localhost/petadoption/backend/profile/update_profile.php',
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Profile updated:', response.data);
      setProfile(values); // Update profile state with form values
      setIsEditing(false); // Exit edit mode
      notification.success({ message: 'Profile updated successfully' });

      if (avatarFile) {
        handleImageUpload(avatarFile);
      }
    } catch (error) {
      notification.error({
        message: 'Error updating profile',
        description: error.response ? error.response.data.message : error.message,
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Exit edit mode without saving
    form.setFieldsValue(profile); // Reset form values to the original profile state
    setImageUrl(profile.avatar ? `http://localhost/petadoption/backend/profile/uploads/${profile.avatar}` : ''); // Reset image URL to the original
  };

  const handleImageUpload = async (file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(
        'http://localhost/petadoption/backend/profile/upload_avatar.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log('Upload response:', response.data); // Check response

      if (response.data.url) {
        setImageUrl(response.data.url); // Update the image URL
        form.setFieldsValue({ avatar: response.data.url }); // Update the form with the new avatar URL
      } else {
        notification.error({ message: 'Error uploading image', description: 'No URL returned from the server.' });
      }
    } catch (error) {
      notification.error({ message: 'Upload failed', description: error.response ? error.response.data.message : error.message });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {isEditing ? (
              <input type="file" accept="image/*" onChange={handleFileChange} />
            ) : (
              <img src={imageUrl || "https://via.placeholder.com/150"} alt="Profile Avatar" />
            )}
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
                  {isEditing ? <Input /> : <p className="profile-text">{profile.username}</p>}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="Email" name="email">
                  {isEditing ? <Input /> : <p className="profile-text">{profile.email}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="Phone" name="phone">
                  {isEditing ? <Input /> : <p className="profile-text">{profile.phone}</p>}
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
                  {isEditing ? <Input /> : <p className="profile-text">{profile.state}</p>}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="City" name="city">
                  {isEditing ? <Input /> : <p className="profile-text">{profile.city}</p>}
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              {isEditing ? (
                <Space>
                  <Button type="primary" htmlType="submit">Save</Button>
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
