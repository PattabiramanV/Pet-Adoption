import React, { useState, useEffect } from "react";
import { Form, notification, Select } from "antd";
import { TextField, FormControl, InputLabel } from '@mui/material';
import axios from "axios";
import "./Profile.css";
import Loader from "../Loader/Loader";

const { Option } = Select;

const Profile = ({ setProfileOpen }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (values) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      if (avatarFile) {
        const avatarUrl = await handleImageUpload(avatarFile);
        values.avatar = avatarUrl;
      }
      await axios.post(
        `${import.meta.env.VITE_PROFILE_BASE_URL}update_profile.php`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setIsEditing(false);
      notification.success({ message: 'Profile updated successfully' });
      setProfile((prevProfile) => ({ ...prevProfile, ...values }));
      setAvatarFile(null);
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

    setLoading(true);
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
        return response.data.url;
      } else {
        notification.error({ message: 'Error uploading image', description: 'No URL returned from the server.' });
        return null;
      }
    } catch (error) {
      notification.error({ message: 'Upload failed', description: error.response ? error.response.data.message : error.message });
      return null;
    } finally {
      setLoading(false);
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
        <Loader />
      </div>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {isEditing ? (
              <div className="div_upload">
                <div className="upload-area">
                  <input type="file" accept="image/*" onChange={handleFileChange} id="file-input" />
                  <label htmlFor="file-input" className="upload-label">
                    {imageUrl ? <img src={imageUrl} alt="Profile Avatar" /> : "Click or Drag to Upload"}
                  </label>
                </div>
              </div>
            ) : (
              <div className="div_profile_imag">
                <div className="div_useand_email">
                  <img src={imageUrl || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"} alt="Profile Avatar" />
                </div>
              </div>
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
            className="profile-form"
            style={{ margin: "0" }}
          >
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item name="username">
                  {isEditing ? (
                    <TextField disabled name="username" label="Username" variant="outlined" fullWidth style={{ margin: '0' }} />
                  ) : (
                    <div className="div_profil">
                      <span className="div_profil_span" >Username</span>
                                          <p className="profile-text">{profile.username}</p>

                    </div>
                  )}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item name="email">
                  {isEditing ? (
                    <TextField disabled name="email" label="Email" variant="outlined" fullWidth style={{ margin: '0' }} />
                  ) : (
                    <div className="div_profil">
                      <span className="div_profil_span" >Email</span>
                                         <p className="profile-text email_text">{profile.email}</p>
 
                    </div>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className={`profile-column ${isEditing ? 'gender_profile' : ''}`}>
                <Form.Item  name="gender"  label={isEditing ? "Gender" : ""} style={{ paddingBottom: '0'  }}
                >
                  {isEditing ? (
                    <FormControl  fullWidth variant="outlined" style={{ margin: '0' }}>
                      {/* <InputLabel id="gender-label">Gender</InputLabel> */}
                      <Select
                        id="gender"
                        // labelId="gender-label"
                        placeholder="Gender"
                        name="gender"
                        style={{height: "3em"}}
                      
                        value={form.getFieldValue('gender') || ''}
                        onChange={(value) => form.setFieldsValue({ gender: value })}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </FormControl>
                  ) : (
                    <div className="div_profil">
                      <span className="div_profil_span" >Gender</span>
                                          <p className="profile-text">{profile.gender}</p>

                    </div>
                  )}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item name="phone">
                  {isEditing ? (
                    <TextField name="phone" label="Phone" variant="outlined" fullWidth style={{ margin: '0' }} />
                  ) : (
                    <div className="div_profil">
                      <span className="div_profil_span" >Phone</span>
                                          <p className="profile-text">{profile.phone}</p>

                    </div>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row full-width">
              <Form.Item name="address">
                {isEditing ? (
                  <TextField name="address" label="Address" variant="outlined" fullWidth multiline rows={2} style={{ margin: '0' }} />
                ) : (
                         <div className="div_profil">
                          <span className="div_profil_span" >Address</span>
                                        <p className="address-text" > {profile.address}</p>

                    </div>
                )}
              </Form.Item>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item name="city">
                  {isEditing ? (
                    <TextField name="city" label="City" variant="outlined" fullWidth style={{ margin: '0' }} />
                  ) : (
                    
                    <div className="div_profil">
                      <span className="div_profil_span" >City</span>
                                          <p className="profile-text">{profile.city}</p>

                    </div>
                  )}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item name="state">
                  {isEditing ? (
                    <TextField name="state" label="State" variant="outlined" fullWidth style={{ margin: '0' }} />
                  ) : (
                    <div className="div_profil">
                      <span className="div_profil_span" >State</span>
                                          <p className="profile-text">{profile.state}</p>

                    </div>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="div_main_for_edit">
              {isEditing ? (
                <div className="div_profile_edit">
                  <button type="button" onClick={handleCancelClick} className="cancel-button-profile">Cancel</button>
                  <button type="submit" className="save-button-profile">Save</button>
                </div>
              ) : (
                <button type="button" onClick={handleEditClick} className="edit-button">Edit</button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
