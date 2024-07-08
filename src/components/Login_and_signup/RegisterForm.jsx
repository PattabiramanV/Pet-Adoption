// src/components/RegisterForm.jsx
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

import Login_logo1 from "../../assets/Logo.png";
import Login_logo from "../../assets/Dog_login.png";
import "./RegisterForm.css";

const RegisterForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <section className="Register_section">
        <div className="register_main">
            


    <div className="register-form-container">

      <div className="register-image">
      <div className="register-imge">
        <img src={Login_logo1}  alt="Login illustration" />
        </div>
        <div className="register-imge1">
        <img src={Login_logo}  alt="Login illustration" />    
        </div>
      </div>


      <div className="register-form">
        <h2>Create your account</h2>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>


          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              I agree to all <a href="#">Terms & Conditions</a>
            </Checkbox>

          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Create Account
            </Button>
          </Form.Item>

          <div className="social-login">
            <p>Or Sign Up with</p>
            <Button shape="circle" icon={<GoogleOutlined />} />
          </div>

          <p>
            Already have an account? <a href="#">Sign in</a>
          </p>

        </Form>
      
      </div>

    </div>

    </div>
    </section>
  );
};

export default RegisterForm;
