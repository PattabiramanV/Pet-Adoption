import React from 'react';
import PetCard from './PetCard';

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
    name: 'Magie',
    location: 'Florida, USA',
    gender: 'Female',
    breed: 'Shiba Inu',
    age: '27 months',
    size: 'Medium',
    description: 'Magie currently lives with two children age 7 and 13 and has m...',
    image: 'https://rukminim2.flixcart.com/image/850/1000/j8hnmvk0/poster/a/x/q/large-poster-cute-pet-animal-lover-poster-for-room-cats-dogs-original-imaeyhmksnvkgh48.jpeg?q=90&crop=false', // Replace with the actual image path
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
      <h1 className='pet-list-name'>Take a Look at Some of <span>Our Pets</span></h1>
      <div className="pet-list-container">
        <div className="pet-list-container-sub">
        <PetCard pet={pets[0]} />
        <PetCard pet={pets[1]} />
        <PetCard pet={pets[2]} />
        <PetCard pet={pets[3]} />

        </div>

      </div>
    </div>
  );
};

export default PetList;
