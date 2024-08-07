import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import './adoptedpets.css';

const AdoptedPets = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get("http://localhost/petadoption/backend/profile/read_profile.php", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const userId = profileResponse.data.id;

        const response = await axios.get(`http://localhost/petadoption/backend/pets_api/get_adopted_pets.php?user_id=${userId}`);
        if (response.data.success) {
          setAdoptedPets(response.data.data);
          setError(null);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Error fetching adopted pets');
        console.error('Error fetching adopted pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptedPets();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="adopted-pets-table">
      <h2>Adopted Pets</h2>
      {adoptedPets.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>City</th>
              <th>State</th>
              <th>Price</th>
              <th>Image</th>
              <th>Adoption Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adoptedPets.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.pet_name}</td>
                <td>{pet.breeds}</td>
                <td>{pet.age}</td>
                <td>{pet.gender}</td>
                <td>{pet.city}</td>
                <td>{pet.state}</td>
                <td>{pet.price}</td>
                <td>
                  {pet.photo ? (
                    <img src={`data:image/jpeg;base64,${pet.photo}`} className="pet-details-img" alt={pet.pet_name} />
                  ) : (
                    <div>No image available</div>
                  )}
                </td>
                <td>{pet.adoption_time}</td>
                <td>{pet.status === 'accepted' ? 'Request Accepted' : 'Request Rejected'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No adopted pets found.</div>
      )}
    </div>
  );
};

export default AdoptedPets;
