import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from "./Home/Section";
import Header from "./Siteframe/Header";
import Petcard from "./Home/pet card/PetList";
import Adoptioncard from "./Home/petadoptioncard/petlist";

import Doctorcard from "./Home/Doctorcard_home/DoctorList";
// import Hostal_card from "./Home/HostalCard/card_list";
// import "./Home.css";


import Footer from "./Siteframe/Footer";
import PeacefulCoexistence from './Home/PeacefulCoexistence';
import { Padding } from '@mui/icons-material';

import BreadcrumbComponent from './commoncomponent/Breadcrumb';
import Pomika from './lostpets/lostpetslist';


function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = () => {
    navigate('/lostpetlisting'); // Navigate to the desired route
  };
  const divMoreBtnHomeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '1em',
  };
  
  return (
    <>
      <Header />
      {/* <BreadcrumbComponent items={[{ title: 'Home', href: '/' } ] } /> */}
      <Section />
      <PeacefulCoexistence />
    
      {/* <Adoptioncard /> */}

      <Doctorcard />
{/* <Pomika  /> */}



      {/* <Doctorcard /> */}
      {/* <Hostal_card /> */}
      {/* <Adoptioncard /> */}
      <Petcard/>
      <div className="div_more_btn_home" style={divMoreBtnHomeStyle} >
        <button className="more hi more-info-btn" onClick={handleNavigation}>See More</button>
      </div>
      <Footer />
    </>
  );
}

export default Home;
