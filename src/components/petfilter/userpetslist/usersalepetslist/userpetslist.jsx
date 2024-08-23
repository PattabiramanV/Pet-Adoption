import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../Loader/Loader';
import './userpetslist.css';
import ReactPaginate from 'react-paginate';
import CommonTable from '../../../commoncomponent/datatable/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Modal from './popmodel'; // Ensure this path is correct

const UserPets = () => {
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userProfileData = profileResponse.data;

        const petsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_pets_by_user.php?id=${userProfileData.id}`);
        setUserPets(Array.isArray(petsResponse.data) ? petsResponse.data : []);
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
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/petsapi/delete_pet.php?id=${petId}`);
        if (response.data.success) {
          Swal.fire('Deleted!', 'Your pet has been deleted.', 'success');
          setUserPets(userPets.filter(pet => pet.id !== petId));
        } else {
          Swal.fire('Error!', response.data.error, 'error');
        }
      } catch (err) {
        Swal.fire('Error!', err.message, 'error');
      }
    }
  };

  const handleUpdate = async (updatedPet) => {
    console.log('Updated Pet Data:', updatedPet); // Check the data
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/petsapi/update_pet.php`,
        updatedPet,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      console.log('API Response:', response.data); // Check API response
      if (response.data.success) {
        Swal.fire('Success!', 'Pet details updated.', 'success');
        setUserPets(userPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet)));
        handleModalClose();
      } else {
        Swal.fire('Error!', response.data.error, 'error');
      }
    } catch (err) {
      console.error('API Error:', err); // Log error details
      Swal.fire('Error!', err.message, 'error');
    }
  };

  const filteredData = userPets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.age.toString().includes(searchTerm) ||
    pet.size.toLowerCase().includes(searchTerm)
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * petsPerPage,
    currentPage * petsPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'adopted':
        return 'status-accepted';
      case 'Available':
        return 'status-available';
      default:
        return '';
    }
  };

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedPet(null);
  };

  const tableHeaders = [
    'S.No', 'Image', 'Name', 'Breed', 'Age', 'Size', 'Description', 'Status', 'Actions'
  ];

  const tableBody = currentData.map((pet, index) => {
    const rowNumber = (currentPage - 1) * petsPerPage + index + 1;

    let image1;
    if (pet.photo) {
      const parsed = JSON.parse(pet.photo);
      const baseUrl = '/backend/petsapi/hostelimg/';
      const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);
      image1 = imageUrls[0];
    }

    return [
      rowNumber,
      image1 ? <img src={image1} className="pet-details-img" alt={pet.name} /> : 'No image available',
      pet.name,
      pet.breed,
      pet.age,
      pet.size,
      pet.description,
      <span className={`status-label ${getStatusClass(pet.status)}`}>
        {pet.status === 'adopted' ? 'Adopted' : 'Available'}
      </span>,
      pet.status !== 'adopted' ? (
        <>
          <button className="edit-btn" onClick={() => handleEditClick(pet)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="delete-btn" onClick={() => handleDeleteClick(pet.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </>
      ) : null
    ];
  });

  return (
    <>
      {loading ? (
        <div><Loader /></div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="table-container mt-10 mb-10">
          <div className="search-container">
            {searchTerm === '' && (
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            )}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input searchBox"
            />
          </div>
          {userPets.length === 0 ? (
            <div className="no-data">
              <img src="/src/assets/nodata.png" alt="No data available" className="no-data-img" />
              <p>No pets found.</p>
            </div>
          ) : (
            <>
              {filteredData.length === 0 ? (
                <div className="no-data">
                  <img src="/path/to/your/no-data-image.png" alt="No data available" className="no-data-img" />
                  <p>No pets match your search criteria.</p>
                </div>
              ) : (
                <>
                  <CommonTable
                    headers={tableHeaders}
                    body={tableBody}
                    isLoading={loading}
                  />
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredData.length / petsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active-page'}
                    previousClassName={'previous-page'}
                    nextClassName={'next-page'}
                    disabledClassName={'disabled-page'}
                  />
                </>
              )}
            </>
          )}
          <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
            <h2>Edit Pet</h2>
            {selectedPet && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const updatedPet = Object.fromEntries(formData.entries());
                  updatedPet.id = selectedPet.id;
                  handleUpdate(updatedPet);
                }}
              >
                <div>
                  <label>Name</label><br></br>
                  <input type="text" name="name" defaultValue={selectedPet.name} />
                </div>
                <div>
                  <label>Breed</label><br></br>
                  <input type="text" name="breed" defaultValue={selectedPet.breed} />
                </div>
                <div>
                  <label>Age</label><br></br>
                  <input type="number" name="age" defaultValue={selectedPet.age} />
                </div>
                <div>
                  <label>Size</label><br></br>
                  <input type="text" name="size" defaultValue={selectedPet.size} />
                </div>
                <div className="descedit">
                  <label>Description</label><br></br>
                  <textarea name="description" defaultValue={selectedPet.description} />
                </div>
              
                <button type="submit" className="mores editbtnpet">Update Pet</button>
              </form>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserPets;
