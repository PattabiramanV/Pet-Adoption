import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import './adoptedpets.css';
import Footer from '../../Siteframe/Footer';
import Header from '../../Siteframe/Header';
import { Pagination } from 'antd'; // Ensure you have antd installed

const AdoptedPets = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;

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

        const response = await axios.get(`http://localhost/petadoption/backend/petsapi/get_adopted_pets.php?user_id=${userId}`);
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

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = adoptedPets.slice(indexOfFirstPet, indexOfLastPet);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="adoptedPetslisttabel">
        <div className="adopted-pets-table widthBalance">
          <h2>Adopted Pets</h2>
          {currentPets.length > 0 ? (
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
                {currentPets.map((pet) => (
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
                    <td className={pet.status === 'accepted' ? 'status-accepted' : 'status-rejected'}>
                      {pet.status === 'accepted' ? ' Accepted' : ' Rejected'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No adopted pets found.</div>
          )}
          <Pagination
            className="pagination"
            current={currentPage}
            pageSize={petsPerPage}
            total={adoptedPets.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdoptedPets;
