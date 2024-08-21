import React, { useEffect, useState } from 'react';
import PetCard from './lostpets';
import { Pagination } from 'antd';
  import Loader from '../Loader/Loader';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are loaded

const LostListMain = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9; // Display 9 pets per page

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

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter pets with status "pending"
  const filteredPets = pets.filter((pet) => pet.status === "pending");

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="pet-list">
      <h1 className="pet-list-name">Posting a Lost Pets Details</h1>
      <div className="pet-list-container">
        <div className="pet-list-container-sub">
          {currentPets.map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={petsPerPage}
          total={filteredPets.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default LostListMain;
