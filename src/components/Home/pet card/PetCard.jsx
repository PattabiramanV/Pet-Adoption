import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import "./Petcard.css"; // Import your CSS file

const PetCard = ({ pet }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigation = () => {
    navigate('/petdetails', { state: { pet } });
  };

  // Construct the image source correctly
  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';

  return (
    <div className="landing_pet-card">
      <div className="landing_pet-card-header">
        <img src={imageSrc} alt={pet.name} className="landing_pet-card-image" />
      </div>

      <div className="landing_pet-card-body">
        <div className="landing_pet-name">
          <div className="landing_names">
            <h2 className="landing_pet-card-name">{pet.name}</h2>
          </div>
          <div className="landing_location">
            <p className="landing_pet-card-locations">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.location}
            </p>
          </div>
        </div>
<div className="div_laing_pet_list">

        {/* <div className="landing_pet-card-info"> */}
          <div className="landing_pet_left_de">
            <div className="landing_Gender">
              <p>
                <strong>Gender:</strong>  
              </p>
              <span className="landing_span_color"> {pet.gender}</span>
            </div>
          </div>
        {/* </div> */}
        <div className="landing_pet_right_de">
            <p>
              <strong>Pet Type:</strong> 
            </p>
            <span className="landing_span_color"> {pet.pet_type} </span> 
          </div>
        <div className="landing_type">
          <p>
            <strong>Lost Date:</strong>
          </p>
          <span className="landing_span_color"> {pet.lost_date}</span>
        </div>
        </div>

        <div className="landing_btn">
          <button className="landing_more-info-btns" onClick={handleNavigation}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
