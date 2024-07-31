import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component

import LoginLogo1 from "../../assets/Logo.png";
import LoginLogo from "../../assets/Cat_login.png";
import "./Login.css";

const { Title, Text, Link } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    setLoading(true); // Show loader

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}login.php`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Received response:", response.data);

      if (response.status === 200) {
        message.success(response.data.message);
        localStorage.setItem('token', response.data.jwt);
        navigate("/"); // Navigate to the Home 
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);

      if (error.response && error.response.status === 401) {
        message.error("Unauthorized");
      } else {
        message.error("There was an error submitting the form!");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleSignInClick = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  const handleHomepage = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleForgotPassword = () => {
    navigate("/reset"); // Navigate to the reset password page
  };

  return (
    <section className="login-section">
      {loading && <Loader />} {/* Show loader if loading */}
      <div className="login-main">
        <div className="login-container">
          <div className="login-form">
            <div className="heading_name">
              <Title level={4} className="color">
                Log In to FurryFriends
              </Title>
            </div>

            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Link className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </Link>
              </Form.Item>

              <Form.Item>
                <div className="div_login">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-button"
                  >
                    Log In
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <Divider>Or Sign Up with</Divider>

            <div className="social-login">
              <Button shape="circle" icon={<GoogleOutlined />} />
            </div>

            <Text className="sign-up-link">
              Don't have an account?{" "}
              <Link onClick={handleSignInClick}>Sign up</Link>
            </Text>
          </div>

          <div className="login-image">
            <div className="login-img">
              <img
                src={LoginLogo1}
                alt="Login illustration"
                onClick={handleHomepage}
              />
            </div>
            <div className="login-img1">
              <img src={LoginLogo} alt="Login illustration" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
