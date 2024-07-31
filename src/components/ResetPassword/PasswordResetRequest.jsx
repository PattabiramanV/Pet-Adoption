import React, { useState } from "react";
import axios from "axios";
import "./PasswordResetRequest.css";
import reset_main from "../../assets/Two factor authentication-pana.png";
import PasswordResetVerify from "./PasswordResetVerify";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/petadoption/backend/resetpassword/passwordresetrequest.php",
        { email }
      );
      console.log(response.data);
      setMessage(response.data.message);
      if (response.data.message === "OTP sent to your email.") {
        console.log("OTP successfully sent, transitioning to verify page.");
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending OTP. Please try again.");
    }
  };

  if (otpSent) {
    console.log("Rendering PasswordResetVerify component");
    return <PasswordResetVerify email={email} />;
  }

  return (
    <div className="div_otp_send">
      <div className="div_otp_main">
        <div className="div_left">
          <img className="password_image" loading="password_image" alt="" src={reset_main} />
        </div>
        <div className="div_right">
          <div className="name_reset_head"> 
            <h2>Password Reset Request</h2>
          </div>
          <div className="div_form_reset">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <div className="div_message">
                <p>{message}</p>
                </div>
              </div>
              <button type="submit">Send OTP</button>
            </form>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default PasswordResetRequest;
