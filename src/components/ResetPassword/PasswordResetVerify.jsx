import React, { useState } from "react";
import axios from "axios";
import reset_verify from "../../assets/Reset password-cuate.png";
import { notification } from "antd";

const PasswordResetVerify = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      // placement: "top",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpRegex = /^\d{6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!otpRegex.test(otp)) {
      openNotification("error", "Invalid OTP. Please enter a 6-digit number.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      openNotification(
        "error",
        "Invalid Password. Must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RESETPASSWORD_BASE_URL}passwordresetverify.php`,
        { email, otp, new_password: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      openNotification("success", response.data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      openNotification("error", "Correct the OTP and password. Please try again.");
    }
  };

  return (
    <div className="reset_verify">
      <div className="container_reset_verify">
        <div className="div_reset_verify_image">
          <img className="reset_verif" loading="reset_verif" alt="" src={reset_verify} />
        </div>
        <div className="div_main_password_verfiy">
          <div className="rest_verify_head_name">
            <h2>Verify OTP and Reset Password</h2>
          </div>
          <div className="reset_form_verfiy">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} readOnly />
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
              <button type="submit" className="otp_btn">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetVerify;
