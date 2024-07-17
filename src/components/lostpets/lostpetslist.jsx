import React from 'react';
import PetCard from './lostpets';

const pets = [
  {
    name: 'Pitter',
    location: 'California, USA',
    gender: 'Male',
    breed: 'Pit Bull',
    age: '5 years',
    size: 'Large',
    description: 'Pitter is a friendly, playful, smart male dog. Only adopted to a home...',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg', // Replace with the actual image path
    isNew: true
  },
  {
    name: 'Hero',
    location: 'Texas, USA',
    gender: 'Male',
    breed: 'DLH',
    age: '2 years',
    size: 'Small',
    description: 'Hero is a playful, smart male cat. You can keep him in an apartment...',
    image: 'https://www.taiyogroup.in/wp-content/uploads/2022/04/Rabbits.jpg', // Replace with the actual image path
  },
  {
    name: 'Felix',
    location: 'New York, USA',
    gender: 'Female',
    breed: 'Scottish',
    age: '9 Months',
    size: 'Small',
    description: 'Felix is a cute and playful female cat. She loves waking running a...',
    image: 'https://friendsofthepound.com/wp-content/uploads/2017/02/foster.jpg', // Replace with the actual image path
  },

];

const PetList = () => {
  return (
    <div className="pet-list">
      <h1 className="pet-list-name">Posting a Lost Pets</h1>
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

export default PetList;
