// PetCard.jsx
import React from "react";
import "./petcard.css"; // Import your CSS file

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <div className="pet-card-header">
        <div className="pet_image">
          <img src={pet.image} alt={pet.name} className="pet-card-image" />
        </div>
      </div>

      <div className="pet-card-body">
        <div className="pet_name">
          <h2 className="pet-card-name">{pet.name}</h2>
          <p className="pet-card-location">
            <i className="fas fa-map-marker-alt"></i> {pet.location}
          </p>
        </div>

        <div className="pet-card-info">
          <div className="pet_left_de">
            <p>
              <strong>Gender:</strong> {pet.gender}
            </p>
            <p>
              <strong>Breed:</strong> {pet.breed}
            </p>
          </div>
          <div className="pet_right_de">
            <p>
              <strong>Age:</strong> {pet.age}
            </p>
            <p>
              <strong>Size:</strong> {pet.size}
            </p>
          </div>
        </div>

        <p className="pet-card-description">{pet.description}</p>
      </div>
    </div>
  );
};

export default PetCard;
