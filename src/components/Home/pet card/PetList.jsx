import React from 'react';
import PetCard from './PetCard';
// import './PetList.css'; // Ensure the CSS file is named correctly

const pets = [
  {
    name: 'Pitter',
    location: 'California, USA',
    gender: 'Male',
    petType: 'Dog',
    lostDate: '2023-06-15',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
  },
  {
    name: 'Hero',
    location: 'Texas, USA',
    gender: 'Male',
    petType: 'Cat',
    lostDate: '2023-07-01',
    image: 'https://www.taiyogroup.in/wp-content/uploads/2022/04/Rabbits.jpg',
  },
  {
    name: 'Magie',
    location: 'Florida, USA',
    gender: 'Female',
    petType: 'Dog',
    lostDate: '2023-07-10',
    image: 'https://rukminim2.flixcart.com/image/850/1000/j8hnmvk0/poster/a/x/q/large-poster-cute-pet-animal-lover-poster-for-room-cats-dogs-original-imaeyhmksnvkgh48.jpeg',
  },

];

const PetList = () => {
  return (
    <div className="pet-list">
      <h1 className="pet-list-name">Take a Look at Some of <span>Our Lost Pets</span></h1>
      <div className="pet-list-container">
        {pets.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
