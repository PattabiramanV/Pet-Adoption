

import React, { useEffect, useState } from 'react';
import PetCard from './foundpetpostscard';
import Loader from '../../Loader/Loader';
const Mylostpetposts = () => {
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
    return <Loader/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pet-list">
      <h1 className="pet-list-name">Posting a Found Pets</h1>
      <div className="pet-list-container">
        <div className="pet-list-container-sub">
          {pets[0] && <PetCard pet={pets[0]} />}
          {pets[1] && <PetCard pet={pets[1]} />}
          {pets[2] && <PetCard pet={pets[2]} />}
        </div>
      </div>
    </div>
  );
};

export default Mylostpetposts;
