import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import LoginLogo1 from "../../assets/Logo.png";
import LoginLogo from "../../assets/Cat_login.png";
import "./Login.css";

import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

const Login = () => {

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  const handleSignInClick = () => {
    navigate('/signup'); // Navigate to the sign-in page
  };
const handlehomepage =() => {
  navigate('/') // Navigate to the home page
};

  return (
    <section className="login-section">
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
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Link className="forgot-password" href="#">
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
              Don't have an account? <Link onClick={handleSignInClick}>Sign up</Link>
            </Text>
          </div>

          <div className="login-image">
            <div className="login-img">
              <img src={LoginLogo1} alt="Login illustration" onClick={handlehomepage}  />
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
