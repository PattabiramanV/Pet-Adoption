import React, { useEffect, useState } from 'react';
import PetCard from '../lostpets';
import { Pagination } from 'antd'; // Import Ant Design Pagination component
import 'antd/dist/reset.css'; // Ensure Ant Design styles are loaded
import Item from 'antd/es/list/Item';

const MyLostListPet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9; // Number of pets per page

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/backend/model/getlostingpet.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPets(data);
        
        console.log(data);
        // console.log(response.data);
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

  // Pagination calculation
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  // console.log(currentPage);
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
          total={pets.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MyLostListPet;
