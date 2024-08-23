import React from 'react';
import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Alllostlist from "./lostpets/lostpetlistpage";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';


const Lostlistmainpage = () => {
  return (
    <>
      <Header />
      <div className="Breadcrumbs">
     <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet', href: '/findpet' },{ title: 'Lost Post Pet List', href: '/lostpetlisting' }]} />
      </div>
      <Alllostlist />
      <Footer />
    </>
  );
};

export default Lostlistmainpage;
