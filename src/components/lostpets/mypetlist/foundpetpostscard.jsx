import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
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
            <p><strong>Gender:</strong><span id="inputscolors">{pet.gender}</span></p>
            <p><strong> Pettype:</strong><span id="inputscolors">{pet.pet_type}</span> </p>
            <p><strong>Lost Date:</strong><span id="inputscolors">{pet.lost_date}</span></p>
          </div>
        <div>
            <button className="more" onClick={handleNavigation}>More Info</button>
            </div>
            </div>
        </div>
  );
};

export default PetCard;
