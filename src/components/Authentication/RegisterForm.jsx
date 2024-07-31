import React from "react";
import { Form, Input, Button, Divider, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import Login_logo1 from "../../assets/Logo.png";
import Login_logo from "../../assets/Dog_login.png";
import "./RegisterForm.css";

const { Text, Link } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      // Send a POST request with the JSON string
      const response = await axios.post(
        "http://localhost/petadoption/backend/auth/register.php",
        values,
        {}
      );

      // console.log("Received response:", response.data);

      if (response.status === 201) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      if (error.response && error.response.status === 400) {
        // Handle email already registered error
        message.error(error.response.data.message);
      } else {
        // Handle other errors
        message.error("There was an error submitting the form!");
      }
    }
  };

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to the log-in page
  };

  const handleHomepage = () => {
    navigate("/"); // Navigate to the home page
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
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
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
    </section>
  );
};

export default RegisterForm;
