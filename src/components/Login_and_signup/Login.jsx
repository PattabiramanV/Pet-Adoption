// src/Login.jsx
import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import Login_logo1 from "../../assets/Logo.png";
import Login_logo from "../../assets/Cat_login.png";
import './Login.css';

const { Title, Text, Link } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <section className="login-section">
      <div className="login_main">

    <div className="login-container">
 

      <div className="login-form">
        <Title level={2} className='color'>Log In to FurryFriends</Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Link className="forgot-password" href="#">Forgot Password?</Link>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Keep me logged in</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Log In
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or Sign Up with</Divider>

        <div className="social-login">
          <Button icon={<GoogleOutlined />} className="google-login">
            Google
          </Button>
          {/* <Button icon={<FacebookOutlined />} className="facebook-login">
            Facebook
          </Button> */}
        </div>

        <Text className="sign-up-link">
          Don't have an account? <Link href="#">Sign up</Link>
        </Text>
      </div>

        
      <div className="login-image">
        <div className="login-imge">
        <img src={Login_logo1}  alt="Login illustration" />
        </div>
        <div className="login-imge1">
        <img src={Login_logo}  alt="Login illustration" />    
        </div>
      </div>



    </div>
    </div>

    </section>
  );
};

export default Login;
