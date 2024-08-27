import React, { useState } from "react";
import { Form, Typography, Divider, message } from "antd";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { GoogleOutlined } from "@ant-design/icons";

import LoginLogo1 from "../../assets/Tablet login-pana.png";
import "./Login.css";

const { Title, Text, Link } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onFinish = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}login.php`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.jwt);
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

  const handleForgotPassword = () => {
    navigate("/reset");
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    console.log(credential);
    

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}google.php`,
        { key: credential }
      );

      if (res.status === 200) {
        const { jwt, message: successMessage } = res.data;

        if (jwt) {
          localStorage.setItem("token", jwt);
          message.success(successMessage);
          navigate("/");
        } else {
          message.error("Login failed. JWT token is missing.");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            message.error("Email already registered.");
            break;
          case 401:
            message.error("Unauthorized access. Please try again.");
            break;
          case 500:
            message.error("Server error. Please try later.");
            break;
          default:
            message.error("An unexpected error occurred.");
            break;
        }
      } else {
        message.error("Network error. Please check your connection.");
      }
    }
  };

  const handleGoogleLoginFailure = (error) => {
    message.error("Google login failed. Please try again.");
    console.error("Google login failed: ", error);
  };

  return (
    <section className="login-section">
      {loading && <Loader />}
      <div className="login-main">
        <div className="login-image">
          <div className="login-img">
            <img
              src={LoginLogo1}
              alt="Login illustration"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <div className="login-form">
          <div className="heading_name_login">
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
                    className="input-field"
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
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Please Enter Valid Password",
                    },
                  ]}
                >
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    className="input-field"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Item>
              </div>

              <div className="div_forgot_pass">
                <div className="div_forget">
                  <Form.Item style={{ margin: "0" }}>
                    <Link
                      className="forgot-password"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </Link>
                  </Form.Item>
                </div>

                <div className="login_btn_div">
                  <button type="submit" className="login-button">
                    Log In
                  </button>
                </div>
              </div>

              <Form.Item style={{ width: "100%" }}>
                <div className="div_sign_link">
                  <Divider style={{ borderColor: "black" }}>Or Sign Up</Divider>
                </div>

                <div className="google-login-button">
                  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onFailure={handleGoogleLoginFailure}
                      render={(renderProps) => (
                        <button
                          type="button"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="google-login-btn"
                        >
                          <GoogleOutlined /> Sign in with Google
                        </button>
                      )}
                    />
                  </GoogleOAuthProvider>
                </div>

                <div className="div_text_login">
                  <Text className="sign-up-link" style={{ margin: "0" }}>
                    Don't have an account?{" "}
                    <Link onClick={handleSignInClick}>Sign up</Link>
                  </Text>
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
