import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './userpetslist.css';
import Loader from '../../Loader/Loader';
import Header from '../../Siteframe/Header';
import Footer from '../../Siteframe/Footer';
import { Pagination } from 'antd'; 

const UserPets = () => {
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get("http://localhost/petadoption/backend/profile/read_profile.php", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userProfileData = profileResponse.data;

        const petsResponse = await axios.get(`http://localhost/petadoption/backend/petsapi/get_pets_by_user.php?id=${userProfileData.id}`);
        setUserPets(petsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleDeleteClick = async (petId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this pet!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost/petadoption/backend/petsapi/delete_pet.php?id=${petId}`);
        if (response.data.success) {
          Swal.fire(
            'Deleted!',
            'Your pet has been deleted.',
            'success'
          );
          setUserPets(userPets.filter(pet => pet.id !== petId));
        } else {
          Swal.fire(
            'Error!',
            response.data.error,
            'error'
          );
        }
      } catch (err) {
        Swal.fire(
          'Error!',
          err.message,
          'error'
        );
      }
    }
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = userPets.slice(indexOfFirstPet, indexOfLastPet);

  if (loading) return <p><Loader /></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="userpets">
        <div className="userDescription">
          <div className="userpet">
            <h3>Thank You for Rehoming Your Pet with Us!</h3>
            <p>We truly appreciate your trust in our platform to find a loving new home for your pet.
              Here is the list of pets you have submitted for rehoming. Our team is dedicated to ensuring that each pet finds a wonderful and caring home.
              Thank you for being a part of this journey!</p>
          </div>
        </div>

        <div className="adopted-pets-table withBalance">
          <h2>My Pets</h2>
          {currentPets.length === 0 ? (
            <p>No pets found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Size</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {currentPets.map(pet => (
                  <tr key={pet.id} className={pet.status === 'adopted' ? 'disabled-row' : ''}>
                    <td>{pet.id}</td>
                    <td>
                      {pet.photo ? (
                        <img src={`data:image/jpeg;base64,${pet.photo}`} className="pet-details-img" alt={pet.name} />
                      ) : (
                        <div>No image available</div>
                      )}
                    </td>
                    <td>{pet.name}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.age}</td>
                    <td>{pet.size}</td>
                    <td className='petdes'>{pet.description}</td>
                    <td>{pet.status === 'adopted' ? 'Adopted' : 'Available'}</td>
                    <td>
                      <div className="modify">
                        {pet.status !== 'adopted' && (
                          <>
                            <button className='button-name'>Edit</button>
                            <button className='button-name' onClick={() => handleDeleteClick(pet.id)}>Delete</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            className="pagination"
            current={currentPage}
            pageSize={petsPerPage}
            total={userPets.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPets;
  