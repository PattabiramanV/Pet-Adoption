// import React from 'react';
// import './card.css';

const CardView = ({ pets = [] }) => {
  // Check if pets is an array
  if (!Array.isArray(pets)) {
    console.error('Expected pets to be an array but got:', pets);
    return <p>No pets data available.</p>;
  }

  return (
    <div>
      <div className="card-container">
        {pets.length > 0 ? (
          pets.map(pet => (
            <div key={pet.id} className="card">
              <img src={pet.image || 'default-image.jpg'} alt={pet.name} className="card-image" />
              <h3 className="card-name">{pet.name}</h3>
              <p className="card-breed">Breed: {pet.breed}</p>
              <p className="card-age">Age: {pet.age} years</p>
              <p className="card-size">Size: {pet.size}</p>
              <p className="card-city">Location: {pet.city}</p>
              <p className="card-gender">Gender: {pet.gender}</p>
              <p className="card-color">Color: {pet.color}</p>
              <a href={`/pet-details/${pet.id}`} className="card-link">More info</a>
            </div>
          ))
        ) : (
          <p>No pets found.</p>
        )}
      </div>
    </div>
  );
};

export default CardView;
