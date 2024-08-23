import React from "react";
import { Link } from 'react-router-dom';
import catanddog from "../../assets/dog.jpg";
import './reuniting.css';

const Reuniting = () => {
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
                <Link to="/lostingpet">
                  <button className="button">
                    Losting a Pet
                  </button>
                </Link>
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

