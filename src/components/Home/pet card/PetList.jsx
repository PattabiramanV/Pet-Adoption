import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import Loader from '../../Loader/Loader'; // Import your custom Loader component

let PetList = () => {
  let [pets, setPets] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    let fetchPets = async () => {
      try {
        let response = await fetch('http://localhost/petadoption/backend/model/getlostingpet.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
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
      <div className="landing_loading-container">
        <Loader /> {/* Use your custom loader component */}
      </div>
    );
  }

  if (error) {
    return <div className="landing_error">Error: {error}</div>;
  }

  return (
    <div className="landing_pet-list">
      <h1 className="landing_pet-list-name">
        Take a Look at Some of <span>Our Lost Pets</span>
      </h1>
      <div className="landing_pet-list-container_1">
        {pets[0] && <PetCard pet={pets[0]} />}
        {pets[1] && <PetCard pet={pets[1]} />}
        {pets[2] && <PetCard pet={pets[2]} />}
      </div>
    </div>
  );
};

export default PetList;
