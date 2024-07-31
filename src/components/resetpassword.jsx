import React from 'react';
import Footer from '../components/Siteframe/Footer';
import Header from '../components/Siteframe/Header';
import PasswordResetRequest from './ResetPassword/PasswordResetRequest';
import PasswordResetVerify from './ResetPassword/PasswordResetVerify';

const PasswordResetPage = () => {
  return (
    <>
      <Header />
      <PasswordResetRequest />
      {/* <PasswordResetVerify /> */}
      <Footer />
    </>
  );
};

export default PasswordResetPage;
