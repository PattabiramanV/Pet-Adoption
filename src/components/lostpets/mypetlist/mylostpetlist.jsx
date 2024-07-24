

// PetList.jsx
import React, { useEffect, useState } from 'react';
import PetCard from './lostpets/mypetlist/my';

const MyLostListPet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/Backend/model/getlostingpet.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPets(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pet-list">
      <h1 className="pet-list-name">Posting a Lost Pets Details</h1>
      <div className="pet-list-container">
        <div className="pet-list-container-sub">
          {pets.map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLostListPet;

