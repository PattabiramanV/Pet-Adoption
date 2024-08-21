import React, { useState } from "react";
import { Form, Input, Button, Divider, Typography, message, notification } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component
import Login_logo1 from "../../assets/Logo.png";
import Login_logo from "../../assets/Dog_login.png";
import "./RegisterForm.css";

const { Text, Link } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    setLoading(true);

    try {
      // Regex for password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      if (!passwordRegex.test(values.password)) {
        openNotification(
          "error",
          "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_BASE_URL}register.php`,
        values,
        {}
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

  const handleHomepage = () => {
    navigate("/");
  };

  return (
    <section className="Register_section">
      <div className="register_main">
        <div className="register-form-container">
          <div className="register-image">
            <div className="close_btn">
              <Link onClick={handleHomepage} className="close_btn_link">
                X
              </Link>
            </div>
            <div className="register-imge">
              <img
                src={Login_logo1}
                alt="Login illustration"
                onClick={handleHomepage}
              />
            </div>
            <div className="register-imge1">
              <img src={Login_logo} alt="Login illustration" />
            </div>
          </div>

          <div className="register-form">
            <h2>Create your account</h2>
            <div className="div_from_sub">
              <Form
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
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
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    type="email"
                    placeholder="Email"
                  />
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
                  <div className="div_login">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="register-form-button"
                      disabled={loading}
                    >
                      Create Account
                    </Button>
                  </div>
                  <Divider>Or Sign Up with</Divider>
                  <div className="social-login">
                    <Button shape="circle" icon={<GoogleOutlined />} />
                  </div>
                </Form.Item>

                <div className="div_account_already">
                  <Text className="sign-up-link">
                    Already have an account{" "}
                    <Link onClick={handleSignInClick}>Sign in</Link>
                  </Text>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />} {/* Use the Loader component */}
    </section>
  );
};

export default RegisterForm;
