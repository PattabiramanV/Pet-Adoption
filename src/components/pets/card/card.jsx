// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './card.css';
function PetDetails({ id, name, city, description = 'No description available', profile, breed, gender, age, size }) {
  
  let parsedPhotos = [];

  if (profile) {
    try {
      parsedPhotos = Array.isArray(profile) ? profile : JSON.parse(profile);
    } catch (error) {
      console.error("Error parsing profile photos:", error);
    }
  }

  const firstPhoto = parsedPhotos.length > 0 ? parsedPhotos[0] : null;

  const imageUrl = firstPhoto ? `/backend/petsapi/hostelimg/${firstPhoto}` : '/backend/petsapi/hostelimg/pug_b.jpg';

  
  return (
    <div className="card-container">
      <div className="cardimg">
        <img
          src={imageUrl}
          className="img"
          alt={name}
        />
      </div>
      <div className="commonData">
        <div className="locationdescript">
          <div className="datas">
            <div className="namelocation">
              <h3 className="name">{name}</h3>
              <h3 className="loca">
                <img className="location" src="/src/assets/location_on.png" alt="marker" />
                <span>{city}</span>
              </h3>
            </div>
            <div className="details">
              <div className="detail1">
                <div className="Breedsname">
                  <div className="genders">
                    <p>Gender: <span>{gender}</span></p>
                  </div>
                  <div className="breed">
                    <p className="breeds">Breed: <span className="right">{breed}</span></p>
                  </div>
                </div>
              </div>
              <div className="detail2">
                <div className="ages">
                  <p>Age: <span id="age">{age}</span></p>
                </div>
                <div className="sizes">
                  <p>Size: <span className="rightSide">{size}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="des">
            <p className="description">{description.slice(0, 70)}...</p>
          </div>
        </div>
        <div className="buttons-card">
          <Link to={`/petDetails/${id}`} className="mores" >More info</Link>
        </div>
      </div>
    </div>
  );
}


PetDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired, // Now expecting a JSON string
  description: PropTypes.string,
  breed: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string.isRequired
};

PetDetails.defaultProps = {
  description: 'No description available'
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
          demo={pet}
        />
      ))}
    </div>
  );
};

CardView.propTypes = {
  pets: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CardView;
