import React, { useState } from "react";
import axios from "axios";
import { notification } from "antd";
import "./PasswordResetRequest.css";
import reset_main from "../../assets/Two factor authentication-pana.png";
import PasswordResetVerify from "./PasswordResetVerify";
import { Oval } from 'react-loader-spinner';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_RESETPASSWORD_BASE_URL}passwordresetrequest.php`,
        { email }
      );
      console.log(response.data);
      setMessage(response.data.message);
      if (response.data.message === "OTP sent to your email.") {
        openNotification("success", "OTP successfully sent to your email.");
        setOtpSent(true);
      } else {
        openNotification("error", response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // setMessage("Error sending OTP. Please try again.");
            // setMessage("Error Please enter valid user email.");

      // openNotification("error", "Error sending OTP. Please try again.");
            openNotification("error", "Please enter valid user email.");




    } finally {
      setLoading(false);
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
              <button type="submit" className="otp_btn" disabled={loading}>
                {loading ? <Oval color="#fff" height={20} width={20} /> : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
        {/* {message && <p>{message}</p>} */}
      </div>
      {loading && (
        <div className="loader-overlay">
          <Oval
            height={80}
            width={80}
            color="#696299"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#f0f0f0"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
};

export default PasswordResetRequest;
