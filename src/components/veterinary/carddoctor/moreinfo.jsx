import React from 'react';
import Header from "../../Siteframe/Header";
import Footer from "../../Siteframe/Footer";
import DoctorMoreInfo from './doctormoreinfo';
<<<<<<< HEAD
import BreadcrumbComponent from '../../../components/commoncomponent/Breadcrumb';
=======
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb';
>>>>>>> Pattabi-pethostel

function Moreinfo() {
  return ( 
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Veterinarians',href: '/Veterinary' },{ title: 'DoctorDetail',href: '/doctormoreinfo' }]} />
      <DoctorMoreInfo />
      <Footer />
    </>
  );
}

export default Moreinfo;