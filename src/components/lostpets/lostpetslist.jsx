// PetList.jsx
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import PetCard from './lostpets';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/getlostingpet.php`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);



  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lost_pet-list">
      <h1 className="lost_pet-list-name">Posting Lost Pets</h1>
      <div className="lost_pet-list-container">
        <div className="lost_pet-list-container-sub">
          {pets.slice(0, 3).map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
      </div>
      {loading && <Loader/>}
    </div>
    
  );  
};

export default PetList;
