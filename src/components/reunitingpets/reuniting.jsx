// src/components/Reuniting_pets/Reuniting.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import catanddog from "../../assets/dog.jpg";
import './reuniting.css';

const Reuniting = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="landing_page_1">
      <div className="landingpage1_main">
        <div className="landingpage1_sub">
          <div className="petAdoptionAndContainer">
            <div className="petAdoptionAnd_text">
              <p className="petAdoptionAnd">
                Pet adoption and rehoming are both vital aspects of animal
                welfare, offering hope and a fresh start to pets in need.
                Open your heart and your home to a shelter pet.
              </p>
              <div className="Div_btn">
                <button className="button" onClick={() => handleNavigation('/foundingpet')}>
                  Founding a Pet
                </button>
                <button className="button" onClick={() => handleNavigation('/lostingpet')}>
                  Losting a Pet
                </button>
              </div>
            </div>
          </div>
          <div className="wrapperDogCat">
            <img className="dogCat" loading="lazy" alt="Cat and Dog" src={catanddog} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reuniting;
