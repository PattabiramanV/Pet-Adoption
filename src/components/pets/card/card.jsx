import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './card.css';


function PetDetails({ name, city, description, profile, breed, gender, age, size }) {
  return (
    <div className="card-container">
      <img src={`data:image/jpeg;base64,${profile}`} className="img" alt={name} />
      <h3 className="name">{name}</h3>
      <h3 className="loca">
        <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker"/>
        <span>{city}</span>
      </h3>
      <div className="details">
        <div className="detail1">
          <p>Gender: <span>{gender}</span></p>
          <p>Breed: <span>{breed}</span></p>
        </div>
        <div className="detail2">
          <p>Age: <span className="age">{age}</span></p>
          <p>Size: <span>{size}</span></p>
        </div>
      </div>
      <p className="description">{description.slice(0, 55)}...</p>
      <div className="buttons-card more-info">
         <Link to={`/petDetails/${name}`} className="more">More info</Link>
      </div>
    </div>
  );
}

PetDetails.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string.isRequired
};


const CardView = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/Backend/api/get_all_pets.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="container">
      {pets.map((pet, index) => (
        <PetDetails 
          key={index}
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

export default CardView;