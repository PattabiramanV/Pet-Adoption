import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from "./Home/Section";
import Header from "./Siteframe/Header";
import Petcard from "./Home/pet card/PetList";
import Footer from "./Siteframe/Footer";
import PeacefulCoexistence from './Home/PeacefulCoexistence';
import { Padding } from '@mui/icons-material';

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
      <Section />
      <PeacefulCoexistence />
      <Petcard />
      <div className="div_more_btn_home" style={divMoreBtnHomeStyle} >
        <button className="more hi" onClick={handleNavigation}>See more</button>
      </div>
      <Footer />
    </>
  );
}

export default Home;
