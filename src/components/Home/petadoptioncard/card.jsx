import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./card.css";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/LostListPet', { state: { pet } });
  };

  // Construct the image source correctly
  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';

  return (
    <div className="pet-card">
      <div className="pet-card-header">
        <img src={imageSrc} alt={pet.pet_name} className="pet-card-image" />
      </div>

      <div className="pet-card-body">
        <div className="pet-name">
          <div className="names">
            <h2 className="pet-card-name">{pet.name}</h2>
          </div>
          <div className="locations">
            <p className="pet-card-locations">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.city}
            </p>
          </div>
        </div>

        <div className="pet-card-info">
          <div className="pet-left">
            <div className="gender">
              <p><strong>Gender:</strong></p>
              <span className="span-color">{pet.gender}</span>
            </div>
          </div>
          <div className="pet-right">
            <p><strong>Breed:</strong></p>
            <span className="span-color">{pet.breeds}</span>
          </div>
        </div>

        <div className="pet-card-info">
          <div className="pet-left">
            <div className="ages">
              <p><strong>Age:</strong></p>
              <span className="span-color">{pet.age}</span>
            </div>
          </div>
          <div className="pet-right">
            <p><strong>Size:</strong></p>
            <span className="span-color">{pet.size}</span>
          </div>
        </div>

        <div className="type">
          <span className="">{pet.description.slice(0, 60)}...</span>
        </div>

        <div className="btn">
          <button className="more-info-btn" onClick={handleNavigation}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
