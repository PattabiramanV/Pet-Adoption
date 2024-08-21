import React, { useState } from "react";
import { Form, Divider, Typography, message, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Login_logo from "../../assets/Sign up-pana.png";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import { GoogleOutlined } from "@ant-design/icons";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import "./RegisterForm.css";

const { Text, Link } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    setLoading(true);

    try {
      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(values.password)) {
        openNotification(
          "error",
          "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        setLoading(false);
        return;
      }

      // API request to register user
      const response = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}register.php`,
        values
      );

      if (response.status === 201) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        message.error("There was an error submitting the form!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleLoginSuccess = async (response) => {
  //   const { credential } = response;

  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}googleregister.php`,
  //       { key: credential }
  //     );

  //     if (res.status === 200) {
  //       message.success(res.data.message);
  //       navigate("/login");
  //     } else {
  //       message.error(res.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response?.status === 400) {
  //       message.error("Email already registered.");
  //     } else {
  //       message.error("An error occurred while trying to login with Google.");
  //     }
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {

  //   navigate("/signup");
  //   console.error("Google login failed: ", error);
  //   message.error("Google login failed. Please try again.");
  // };

  return (
    <section className="Register_section">
      <div className="div_register_main">
        <div className="div_register_image">
          <img src={Login_logo} alt="Login illustration" />
        </div>

        <div className="div_main_form">
          <div className="heading_name_reg">
            <h1 className="heading_name_h1">Welcome</h1>
            <span className="heading_name_span">To FurryFriends</span>
          </div>
          <Form
            style={{ width: "100%" }}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="min_reg_sub">
              <div className="div_user_email_password_regester">
                <div className="div_user_reg">
                  <Form.Item
                    style={{ width: "70%" }}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <TextField
                      fullWidth
                      label="Username"
                      className="input-field"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountBoxIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="div_email_reg">
                  <Form.Item
                    style={{ width: "70%" }}
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      className="input-field"
                      type="email"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="div_password_reg">
                  <Form.Item
                    style={{ width: "70%" }}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="div_button_reg">
                <Form.Item style={{ width: "70%" }}>
                  <div className="div_button_reg_sub">
                    <div className="div_reg_btn">
                      <button
                        type="submit"
                        className="register-form-button"
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </button>
                    </div>
                    <div className="div_diver_reg">
                      <Divider style={{ borderColor: "black", width: "20em" }}>
                        Or Sign in
                      </Divider>
                    </div>
                    {/* <div className="google-login-button">
                      <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
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
                              <GoogleOutlined /> Login with Google
                            </button>
                          )}
                        />
                      </GoogleOAuthProvider>
                    </div> */}
                    <div className="div_link_reg">
                      <Text className="sign-up-link">
                        Already have an account
                        <Link onClick={handleSignInClick}> Sign in</Link>
                      </Text>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        {loading && <Loader />}
      </div>
    </section>
  );
};

export default RegisterForm;
