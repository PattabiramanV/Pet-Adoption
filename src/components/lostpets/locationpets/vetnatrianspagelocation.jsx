// import React, { useState, useEffect } from 'react';
// import PetCard from '../../Home/petcard/PetCard';
// import Loader from '../../Loader/Loader'; // Import your custom Loader component

// const LostPetsList = () => {
//   const [loading, setLoading] = useState(true);

//   // Simulating data fetch with a useEffect hook
//   useEffect(() => {
//     const fetchData = async () => {
//       // Simulate a delay for loading
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   // Sample pets data
//   const pets = [
//     {
//       name: 'Pitter',
//       location: 'California, USA',
//       gender: 'Male',
//       petType: 'Dog',
//       lostDate: '2023-06-15',
//       image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
//     },
//     {
//       name: 'Hero',
//       location: 'Texas, USA',
//       gender: 'Male',
//       petType: 'Cat',
//       lostDate: '2023-07-01',
//       image: 'https://www.taiyogroup.in/wp-content/uploads/2022/04/Rabbits.jpg',
//     },
//     {
//       name: 'Magie',
//       location: 'Florida, USA',
//       gender: 'Female',
//       petType: 'Dog',
//       lostDate: '2023-07-10',
//       image: 'https://rukminim2.flixcart.com/image/850/1000/j8hnmvk0/poster/a/x/q/large-poster-cute-pet-animal-lover-poster-for-room-cats-dogs-original-imaeyhmksnvkgh48.jpeg',
//     },
//   ];

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="lost-pets-list">
//       {pets.map((pet, index) => (
//         <PetCard
//           key={index}
//           name={pet.name}
//           location={pet.location}
//           gender={pet.gender}
//           petType={pet.petType}
//           lostDate={pet.lostDate}
//           image={pet.image}
//         />
//       ))}
//     </div>
//   );
// };

// export default LostPetsList;
