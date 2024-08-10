import React, { useState } from "react";
import { Form, Typography, Divider, message } from "antd";
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component

import LoginLogo1 from "../../assets/Tablet login-pana.png";
import "./Login.css";

const { Title, Text, Link } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onFinish = async (values) => {
    setLoading(true);
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}login.php`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.status === 200) {
        message.success(response.data.message);
        localStorage.setItem('token', response.data.jwt);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized");
      } else {
        message.error("There was an error submitting the form!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate("/signup");
  };

  const handleHomepage = () => {
    // navigate("/");
  };

  const handleForgotPassword = () => {
    navigate("/reset");
  };

  return (
    <section className="login-section">
      {loading && <Loader />} {/* Show loader if loading */}
      <div className="login-main">
        <div className="login-image">
          <div className="login-img">
            <img
              src={LoginLogo1}
              alt="Login illustration"
              onClick={handleHomepage}
            />
          </div>
        </div>

        <div className="login-form">
          <div className="heading_name">
            <h1 className="heading_name_h1">Welcome</h1>
            <span className="heading_name_span">To FurryFriends</span>
          </div>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="login_user_main">
              <div className="div_user_password_email">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    className="input-field" // Add class for input box styling
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Please Enter Valid Password",
                    },
                  ]}
                >
                  <TextField
                    label="Password"
                    
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    className="input-field" // Add class for input box styling
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> :  <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Item>
              </div>

              <div className="div_forgot_pass">
                <div className="div_forget">
                  <Form.Item style={{ margin: '0' }}>
                    <Link className="forgot-password" onClick={handleForgotPassword}>
                      Forgot Password?
                    </Link>
                  </Form.Item>
                </div>

                <div className="login_btn_div">
                  
                  <button
                    type="submit"
                    className="login-button" // Use a normal button with custom CSS
                  >
                    Log In
                  </button>
                </div>
              </div>
              <Form.Item  style={{ width: '100%' }}  >

              <div className="div_sign_link">
              <Divider  style={{  borderColor: 'black' }}>Or Sign Up</Divider>
<div className="div_text_login">
<Text className="sign-up-link" style={{ margin: '0' }}>
                  Don't have an account?{" "}
                  <Link onClick={handleSignInClick}>Sign up</Link>
                </Text>
</div>
          
              </div>
              </Form.Item>

            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
