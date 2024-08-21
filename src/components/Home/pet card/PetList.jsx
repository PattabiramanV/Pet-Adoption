import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import Loader from '../../Loader/Loader'; // Import your custom Loader component

// const pets = [
//   {
//     name: 'Pitter',
//     location: 'California, USA',
//     gender: 'Male',
//     petType: 'Dog',
//     lostDate: '2023-06-15',
//     image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
//   },
//   {
//     name: 'Hero',
//     location: 'Texas, USA',
//     gender: 'Male',
//     petType: 'Cat',
//     lostDate: '2023-07-01',
//     image: 'https://www.taiyogroup.in/wp-content/uploads/2022/04/Rabbits.jpg',
//   },
//   {
//     name: 'Magie',
//     location: 'Florida, USA',
//     gender: 'Female',
//     petType: 'Dog',
//     lostDate: '2023-07-10',
//     image: 'https://rukminim2.flixcart.com/image/850/1000/j8hnmvk0/poster/a/x/q/large-poster-cute-pet-animal-lover-poster-for-room-cats-dogs-original-imaeyhmksnvkgh48.jpeg',
//   },
// ];

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
        Take a Look at Some of <span>Our Lost Pets</span>
      </h1>
      <div className="pet-list-container_1">
      {pets[0] && <PetCard pet={pets[0]} />}
          {pets[1] && <PetCard pet={pets[1]} />}
          {pets[2] && <PetCard pet={pets[2]} />}
      </div>
    </div>
  );
};

export default PetList;
