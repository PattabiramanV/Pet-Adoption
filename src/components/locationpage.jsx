import React from 'react';
import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Locationpage from "../components/Map/map";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';


const Location = () => {
  return (
    <>
      <Header />
     <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet', href: '/findpet' },{ title: 'Lost Post Pet List', href: '/lostpetlisting' }]} />
      <Locationpage />
      <Footer />
    </>
  );
};

export default Location;