import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./Petcard.css"; // Import your CSS file

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <div className="pet-card-header">
        <img src={pet.image} alt={pet.name} className="pet-card-image" />
      </div>

      <div className="pet-card-body">
        <div className="pet-name">
          <div className="name">
            <h2 className="pet-card-name">{pet.name}</h2>
          </div>
          <div className="location">
            <p className="pet-card-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.location}
            </p>
          </div>
        </div>

        <div className="pet-card-info">
          <div className="pet_left_de">
            <div className="Gender">
              <p>
                <strong>Gender:</strong> {pet.gender}
              </p>
            </div>
            <div className="type">
              <p>
              <strong>Lost Date:</strong> {pet.lostDate}
              </p>
            </div>
          </div>
          <div className="pet_right_de">
            <p>
            <strong>Pet Type:</strong> {pet.petType}

            </p>
          </div>
        </div>

        <div className="btn">
          <button className="more-info-btn">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
