import React, { useState, useEffect } from "react";
import { Button, Input, Space, Form, Select, notification } from "antd";
import axios from "axios";
import "./Profile.css";
import Loader from "../Loader/Loader";  // Import the Loader component

const { Option } = Select;

const Profile = ({ setProfileOpen }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      setLoading(true);  // Show loader
      try {
        const response = await axios.get(`${import.meta.env.VITE_PROFILE_BASE_URL}read_profile.php`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        form.setFieldsValue(response.data);
        setImageUrl(response.data.avatar || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        notification.error({ message: 'Error fetching profile', description: error.message });
      } finally {
        setLoading(false);  // Hide loader
      }
    };

    fetchProfile();
  }, [form]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (values) => {
    const token = localStorage.getItem('token');
    setLoading(true);  // Show loader
    try {
      await axios.post(
        `${import.meta.env.VITE_PROFILE_BASE_URL}update_profile.php`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProfile(values);
      setIsEditing(false);
      notification.success({ message: 'Profile updated successfully' });

      if (avatarFile) {
        await handleImageUpload(avatarFile);
      }
    } catch (error) {
      notification.error({
        message: 'Error updating profile',
        description: error.response ? error.response.data.message : error.message,
      });
    } finally {
      setLoading(false);  
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    form.setFieldsValue(profile);
    setImageUrl(profile.avatar || '');
  };

  const handleImageUpload = async (file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);  // Show loader
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PROFILE_BASE_URL}upload_avatar.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.data.url) {
        setImageUrl(response.data.url);
        setProfile((prevProfile) => ({ ...prevProfile, avatar: response.data.url }));
        form.setFieldsValue({ avatar: response.data.url });
      } else {
        notification.error({ message: 'Error uploading image', description: 'No URL returned from the server.' });
      }
    } catch (error) {
      notification.error({ message: 'Upload failed', description: error.response ? error.response.data.message : error.message });
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader /> {/* Use your custom loader component */}
      </div>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {isEditing ? (
              <input type="file" accept="image/*" onChange={handleFileChange} />
            ) : (
              <img src={imageUrl || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"} alt="Profile Avatar" />
            )}
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
                  {isEditing ? <Input readOnly /> : <p className="profile-text">{profile.username} </p>}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="Email" name="email">
                  {isEditing ? <Input readOnly /> : <p className="profile-text email_text">{profile.email}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
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
              <div className="profile-column">
                <Form.Item label="Phone" name="phone">
                  {isEditing ? <Input /> : <p className="profile-text">{profile.phone}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="Address" name="address">
                  {isEditing ? <Input.TextArea rows={4} /> : <p className="address-text">{profile.address}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="City" name="city">
                  {isEditing ? <Input /> : <p className="profile-text">{profile.city}</p>}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="State" name="state">
                  {isEditing ? <Input /> : <p className="profile-text">{profile.state}</p>}
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <div className="div_main_for_edit">
                {isEditing ? (
                  <div className="div_profile_edit">
                    <button onClick={handleCancelClick} className="cancel-button-profile profile">Cancel</button>
                    <button type="submit" className="save-button-profile profile">Save</button>
                  </div>
                ) : (
                  <button onClick={handleEditClick} className="edit-button profile">Edit</button>
                )}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
