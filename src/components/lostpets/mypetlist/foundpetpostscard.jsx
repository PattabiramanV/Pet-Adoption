import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "../lostpets.css";      

const PetCard = ({ pet }) => {
  const imageSrc = `data:image/jpeg;base64,${pet.photo}`;
  
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
        <p><strong>Lost Date:</strong> {pet.lost_date}</p>
        
        <Link to={{ pathname: '/checkboxpage', state: { pet } }}>
          <button className="more">See more</button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
