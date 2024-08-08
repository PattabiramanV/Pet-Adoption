import React, { useState } from "react";
import { Form, Divider, Typography, message, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component
import Login_logo from "../../assets/Sign up-pana.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserOutlined from "@ant-design/icons/UserOutlined";
import MailOutlined from "@ant-design/icons/MailOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
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
      // Regex for password validation
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="Register_section">
      <div className="div_register_main">

        <div className="div_register_image">
          <img src={Login_logo} alt="Login illustration" />
        </div>
        
        <div className="div_main_form">
          <div className="heading_name">
            <h1 className="heading_name_h1">Welcome</h1>
            <span className="heading_name_span">To FurryFriends</span>
          </div>
          <Form
            style={{ width: '100%' }}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="min_reg_sub">
              
              <div className="div_user_email_password_regester">
                <div className="div_user_reg">
                  <Form.Item
                    style={{ width: '70%' }}
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
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <UserOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="div_email_reg">
                  <Form.Item
                    style={{ width: '70%' }}
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
                      type="email"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <MailOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="div_password_reg">
                  <Form.Item
                    style={{ width: '70%' }}
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
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="div_button_reg">
                <Form.Item                     style={{ width: '70%' }}
                >
                  <div className="div_button_reg_sub">
                    <div className="div_reg_btn">
                      <button
                        type="submit"
                        className="register-form-button"
                        disabled={loading}
                      >
                        Create Account
                      </button>
                    </div>
                    <div className="div_diver_reg">
                      <Divider  style={{  borderColor: 'black' , width:'20em'}}>Or Sign in</Divider>
                    </div>
                    <div className="div_link_reg">
                      <Text className="sign-up-link">
                        Already have an account{" "}
                        <Link onClick={handleSignInClick}>Sign in</Link>
                      </Text>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        {loading && <Loader />} {/* Use the Loader component */}
      </div>
    </section>
  );
};

export default RegisterForm;
