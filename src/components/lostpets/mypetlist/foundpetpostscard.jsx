
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "../lostpets.css";      

const PetCard = ({ pet }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = () => {
    navigate('/petdetails', { state: { pet } });
  };
  
  const imageSrc = `data:image/jpeg;base64,${pet.photo}`;
  
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
          <p><strong>Gender:</strong><span id="lost_inputscolors">{pet.gender}</span></p>
          <p><strong>Pet Type:</strong><span id="lost_inputscolors">{pet.pet_type}</span></p>
          <p><strong>Lost Date:</strong><span id="lost_inputscolors">{pet.lost_date}</span></p>
        </div>
        <div>
          <button className="lost_more" onClick={handleNavigation}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
