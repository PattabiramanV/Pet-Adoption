import React from 'react';
import Footer from '../components/Siteframe/Footer';
import Header from '../components/Siteframe/Header';
import PasswordResetRequest from './ResetPassword/PasswordResetRequest';
import PasswordResetVerify from './ResetPassword/PasswordResetVerify';
import BreadcrumbComponent from './commoncomponent/Breadcrumb';
const PasswordResetPage = () => {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reset Password', href: '/reset' }]} />
      <PasswordResetRequest />
      {/* <PasswordResetVerify /> */}
      <Footer />
    </>
  );
};

export default PasswordResetPage;
