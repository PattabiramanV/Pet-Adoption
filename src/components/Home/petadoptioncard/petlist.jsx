// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import CardView from './card'; // Adjust the import path as needed

// const PetList = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Replace the URL with your API endpoint
//     Axios.get('http://localhost/petadoption/backend/pethomeapi/petadoption.php')
//       .then(response => {
//         setPets(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('Failed to fetch pet data.');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Get the last 3 pets
//   const lastThreePets = pets.slice(-3);



//   return (
//     <div className="pet-list">
//       <h1 className="pet-list-name">
//         Take a Look at Some of <span>Pet For Adoption</span>
//       </h1>
//       <div className="pet-list-container_1">
//       <CardView pets={lastThreePets} />

//       </div>
//     </div>
//   );



  
  
// };

// export default PetList;
import React, { useState, useEffect } from 'react';
import PetCard from './card';
import Loader from '../../Loader/Loader'; // Import your custom Loader component

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/backend/pethomeapi/petadoption.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        
        setPets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader /> {/* Use your custom loader component */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pet-list">
      <h1 className="pet-list-name">
  
     Review some of the <span> Pet Adoption information</span>
      </h1>
      <div className="pet-list-container_1">
      {pets.slice(0, 3).map(pet => <PetCard key={pet.id} pet={pet} />)}
      </div>
    </div>
  );
};

export default PetList;
