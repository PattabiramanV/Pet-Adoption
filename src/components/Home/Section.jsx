import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import catanddog from "../../assets/Dog_&_Cat.png";
import name from "../../assets/Give a new life to Furry Friends.png";
import './Section.css';

const Section = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleNavigation = () => {
    navigate('/map'); // Navigate to the desired route when the button is clicked
  };

  return (
    <section className="landing_page_1">
      <div className="landingpage1_main">
        <div className="landingpage1_sub">
          <div className="petAdoptionAndContainer">
            <div className="text1">
              <img className="dogCatname" loading="lazy" alt="" src={name} />
            </div>
            <div className="petAdoptionAnd_text">
              <p className="petAdoptionAnd">
                Pet adoption and rehoming are both vital aspects of animal
                welfare, offering hope and a fresh start to pets in need.
              </p>
              <div className="div_landing_find_near">
                <button 
                  className="landing_more-info-btns" 
                  onClick={handleNavigation} // Add onClick handler to navigate
                >
                  Find Nearby Location
                </button>
              </div>
            </div>
          </div>
          <div className="wrapperDogCat">
            <img className="dogCat" loading="lazy" alt="" src={catanddog} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
