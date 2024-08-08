import React, { useState, useEffect } from "react";
import { Input, Form, Select, notification } from "antd";
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
  }, [form]);

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
                <div className="divdiv_useand_email">
                {/* {isEditing ? <InputreadOnly  /> : <p className="profile-text profil_name_and_email">{profile.username}</p>}
                {isEditing ? <Input readOnly /> : <p className="profile-text email_text profil_name_and_email">{profile.email}</p>} */}

                           <h1 className=" profil_name_and_email">{profile.username}</h1>
                          <h2 className="profil_name_and_email"> {profile.email}</h2> 
                          </div>  
                  
                          </div>
            ) : (
              <div className="div_profile_imag">
    
              <div className="div_useand_email">
              <img src={imageUrl || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"} alt="Profile Avatar" />

              </div>
                        <div className="divdiv_useand_email">
                          <h1 className=" profil_name_and_email">{profile.username}</h1>
                          <h2 className="profil_name_and_email"> {profile.email}</h2>
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
            style={{
              margin:"0"
            }}
          >
            <div className="profile-row "  style={{display:'none'}}>
              <div className="profile-column " style={{display:'none'}}>
                <Form.Item label="Username" name="username" style={{ margin: '0' }}>
                  {isEditing ? <Input readOnly  /> : <p className="profile-text">{profile.username}</p>}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="Email" name="email" style={{ margin: '0' }}>
                  {isEditing ? <Input readOnly /> : <p className="profile-text email_text">{profile.email}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="Gender" name="gender" style={{ margin: '0' }}>
                  {isEditing ? (
                    <Select
                      className="gen"
                      style={{
                        width: '100%',
                        margin: '8px 0',
                        display: 'inline-block',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        height: '3.5em',
                        boxSizing: 'border-box',
                      }}
                    >
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
                <Form.Item label="Phone" name="phone" style={{ margin: '0' }}>
                  {isEditing ? <Input /> : <p className="profile-text">{profile.phone}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="profile-row full-width">
              <Form.Item label="Address" name="address" style={{ margin: '0' }}>
                {isEditing ? <Input.TextArea rows={4} /> : <p className="address-text">{profile.address}</p>}
              </Form.Item>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <Form.Item label="City" name="city" style={{ margin: '0' }}>
                  {isEditing ? <Input /> : <p className="profile-text">{profile.city}</p>}
                </Form.Item>
              </div>
              <div className="profile-column">
                <Form.Item label="State" name="state" style={{ margin: '0' }}>
                  {isEditing ? <Input /> : <p className="profile-text">{profile.state}</p>}
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
