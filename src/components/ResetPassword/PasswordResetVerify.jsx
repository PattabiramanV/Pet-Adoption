import React, { useState } from 'react';
import axios from 'axios';
// import './PasswordResetVerify.css'; // Import the CSS file if you have one

const PasswordResetVerify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost/petadoption/backend/resetpassword/password_reset_verify.php',
        JSON.stringify({ email, otp, new_password: newPassword }), // Convert data to JSON
        {
          headers: {
            'Content-Type': 'application/json' // Set content type to JSON
          }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error); // Log the error for debugging
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Verify OTP and Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetVerify;
