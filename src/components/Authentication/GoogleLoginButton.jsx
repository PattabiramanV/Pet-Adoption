import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
  const handleGoogleLogin = (response) => {
    console.log(response);
    // Handle the Google login success
  };

  const handleGoogleLoginFailure = (error) => {
    console.error(error);
    // Handle the Google login failure
  };

  return (
    <section className="Register_section">
      {/* Your existing RegisterForm code */}

      <div className="social-login-buttons">
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>

      {/* The rest of your RegisterForm code */}
    </section>
  );
};

export default GoogleLoginButton;
