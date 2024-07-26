// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Import axios
// import PetCard from './mylostpetpostscard'; // Ensure the path is correct

// const Mylostpetposts = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchPets = async () => {
//       if (!token) {
//         setError('No token found. Please log in.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost/petadoption/Backend/model/getmylostpetposts.php', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         // Check if the response contains the expected data
//         if (Array.isArray(response.data)) {
//           setPets(response.data);
//         } else {
//           setError('Unexpected response format.');
//         }
//       } catch (err) {
//         // Log the full error for debugging purposes
//         console.error('Error fetching pets:', err);
//         setError('Failed to fetch pets. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, [token]); // Adding token to dependencies array

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="pet-list">
//       <h1 className="pet-list-name">Posting a Found Pet</h1>
//       <div className="pet-list-container">
//         <div className="pet-list-container-sub">
//           {pets.length > 0 ? (
//             pets.map((pet) => (
//               <PetCard key={pet.id} pet={pet} />
//             ))
//           ) : (
//             <div>No pets found.</div>
//           )}
        
//       </div>
//         </div>
//       </div>
//   );
// };

// export default Mylostpetposts;




import React, { useEffect, useState } from 'react';
import PetCard from './mylostpetpostscard';

const Mylostpetposts = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/backend/model/getlostingpet.php');
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
