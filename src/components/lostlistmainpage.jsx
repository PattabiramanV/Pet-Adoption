import React from 'react';
import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Alllostlist from "./lostpets/lostpetlistpage";
import BreadcrumbComponent from './commoncomponent/Breadcrumb';


const Lostlistmainpage = () => {
  return (
    <>
      <Header />
      <div className="Breadcrumbs">
     <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'LostPetList', href: '/lostpetlisting' }]} />
      </div>
      <Alllostlist />
      <Footer />
    </>
  );
};

export default Lostlistmainpage;
