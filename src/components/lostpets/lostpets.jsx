import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./lostpets.css"; // Import your CSS file

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/petdetails', { state: { pet } });
  };

  const imageSrc = `data:image/jpeg;base64,${pet.photo}`;
  console.log(pet.location);

  return (
    <div className="lost_pet-card">
      <div className="lost_pet-card-header">
        <div className="lost_pet_image">
          <img src={imageSrc} alt={pet.name} className="lost_pet-card-image" />
        </div>
      </div>

      <div className="lost_pet-card-body">
        <div className="lost_pet_name">
          <h2 className="lost_pet-card-name">{pet.name}</h2>
          <p className="lost_pet-card-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.location}
          </p>
        </div>

        <div className="lost_pet-card-info">
          <p><strong> Gender:</strong><span id="lost_inputcolor">{pet.gender}</span></p>
          <p><strong>Pet Type:</strong><span id="lost_inputcolor">{pet.pet_type}</span></p>
          <p className="lost_pet_title"><strong>Lost Date:</strong><span id="lost_inputcolor"> {pet.lost_date}</span></p>
        </div>
        <div>
          <button className="lost_more" onClick={handleNavigation}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;




