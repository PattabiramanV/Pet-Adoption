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

  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';

  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img src={imageSrc} alt={pet.name} className="pet-card-image" />
      </div>

      <div className="pet-card-body">
        <div className="pet-card-header">
          <h2 className="pet-name">{pet.name}</h2>
          <p className="pet-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.city}
          </p>
        </div>

        <div className="pet-card-info">
          <div className="pet-info-item">
            <p>Gender:</p>
            <span className="info-value">{pet.gender}</span>
          </div>
          <div className="pet-info-item">
            <p>Breed:</p>
            <span className="info-value">{pet.breeds}</span>
          </div>
        </div>

        <div className="pet-card-info 2">
          <div className="pet-info-item 1">
            <p>Age:</p>
            <span className="info-value">{pet.age} year</span>
          </div>
          <div className="pet-info-item">
            <p>Size:</p>
            <span className="info-value">{pet.size}</span>
          </div>
        </div>

        <p className="pet-description">
          {pet.description.slice(0, 60)}...
        </p>

        <button className="more-info-btn" onClick={handleNavigation}>More Info</button>
      </div>
    </div>
  );
};

export default PetCard;
