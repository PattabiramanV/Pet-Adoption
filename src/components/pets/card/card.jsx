// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './card.css';

function PetDetails({ id, name, city, description, profile, breed, gender, age, size }) {
  return (
    <div className="card-container">
      <img
        src={`data:image/jpeg;base64,${profile}`}
        className="img"
        alt={name}
      />
      <h3 className="name">{name}</h3>
      <h3 className="loca">
        <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker"/>
        <span>{city}</span>
      </h3>
      <div className="details">
        <div className="detail1">
          <p>Gender: <span>{gender}</span></p>
          <p className="breeds">Breed: <span className="right">{breed}</span></p>
        </div>
        <div className="detail2">
          <p>Age: <span className="age">{age}</span></p>
          <p>Size: <span className="rightSide">{size}</span></p>
        </div>
      </div>
      <p className="description">{description.slice(0, 55)}...</p>
      <div className="buttons-card">
        <Link to={`/petDetails/${id}`} className="mores">More info</Link>
      </div>
    </div>
  );
}

PetDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string.isRequired
};

const CardView = ({ pets }) => {
  if (!Array.isArray(pets)) {
    return <p>No pets available.</p>;
  }

  return (
    <div className="container">
      {pets.map(pet => (
        <PetDetails 
          key={pet.id}
          id={pet.id}
          name={pet.pet_name}
          city={pet.city}
          description={pet.description}
          profile={pet.photo}
          breed={pet.breeds}
          gender={pet.gender}
          age={pet.age}
          size={pet.size}
        />
      ))}
    </div>
  );
};

CardView.propTypes = {
  pets: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CardView;
