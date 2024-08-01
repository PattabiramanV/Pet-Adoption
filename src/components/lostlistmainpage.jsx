import React from 'react';
import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Alllostlist from "./lostpets/lostpetlistpage";

const Lostlistmainpage = () => {
  return (
    <>
      <Header />
      <Alllostlist />
      <Footer />
    </>
  );
};

export default Lostlistmainpage;
