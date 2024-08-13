import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import "./Petcard.css"; // Import your CSS file

const PetCard = ({ pet }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigation = () => {
    navigate('/LostListPet', { state: { pet } });
  };

  // Construct the image source correctly
  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';

  return (
    <div className="pet-card">
      <div className="pet-card-header">
        <img src={imageSrc} alt={pet.name} className="pet-card-image" />
      </div>

      <div className="pet-card-body">
        <div className="pet-name">
          <div className="names">
            <h2 className="pet-card-name">{pet.name}</h2>
          </div>
          <div className="location">
            <p className="pet-card-locations">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.location}
            </p>
          </div>
        </div>

        <div className="pet-card-info">
          <div className="pet_left_de">
            <div className="Gender">
              <p>
                <strong>Gender:</strong>  
              </p>
              <span className="span_color"> {pet.gender}</span>
            </div>
          </div>
          <div className="pet_right_de">
            <p>
              <strong>Pet Type:</strong> 
            </p>
            <span  className="span_color"> {pet.pet_type} </span> 
          </div>
        </div>
        <div className="type">
          <p>
            <strong>Lost Date:</strong>
           
          </p>
          <span  className="span_color"> {pet.lost_date}</span>
        </div>

        <div className="btn">
          <button className="more-info-btns" onClick={handleNavigation}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
