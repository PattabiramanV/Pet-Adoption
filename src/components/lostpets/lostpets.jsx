import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./lostpets.css"; // Import your CSS file

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/checkboxpage', { state: { pet } });
  };

  const imageSrc = `data:image/jpeg;base64,${pet.photo}`;
  console.log(pet.location);

  return (
    <div className="pet-card">
      <div className="pet-card-header">
        <div className="pet_image">
          <img src={imageSrc} alt={pet.name} className="pet-card-image" />
        </div>
      </div>

      <div className="pet-card-body">
        <div className="pet_name">
          <h2 className="pet-card-name">{pet.name}</h2>
          <p className="pet-card-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.location}
          </p>
        </div>

        <div className="pet-card-info">
          <div className="pet_left_de">
            <p>
              <strong>Gender:</strong> {pet.gender}
            </p>
          </div>
          <div className="pet_right_de">
            <p>
              <strong>Pet:</strong> {pet.pet_type}
            </p>
          </div>
         </div>
        <p><strong>LostDate:</strong> {pet.lost_date}</p>
        <button className="more" onClick={handleNavigation}>See more</button>
      </div>
    </div>
  );
};

export default PetCard;



