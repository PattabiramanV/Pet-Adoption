import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../Loader/Loader';
import './userpetslist.css';
import ReactPaginate from 'react-paginate';
import CommonTable from '../../../commoncomponent/datatable/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from './popmodel'; 
import { notification } from 'antd';


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
  const result = window.confirm('Are you sure you want to delete this pet? This action cannot be undone.');
  if (result) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/petsapi/delete_pet.php?id=${petId}`);
      if (response.data.success) {
        notification.success({
          message: 'Pet Deleted',
          description: 'Your pet has been successfully deleted.',
        });
        setUserPets(userPets.filter(pet => pet.id !== petId));
      } else {
        notification.error({
          message: 'Deletion Failed',
          description: response.data.error,
        });
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.message,
      });
    }
  }
};

const handleUpdate = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/petsapi/update_pet.php`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    if (response.data.success) {
      notification.success({
        message: 'Pet Updated',
        description: 'Pet details have been updated successfully.',
      });

      const token = localStorage.getItem("token");
      const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const userProfileData = profileResponse.data;

      const petsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_pets_by_user.php?id=${userProfileData.id}`);
      setUserPets(Array.isArray(petsResponse.data) ? petsResponse.data : []);
      
      handleModalClose();
    } else {
      notification.error({
        message: 'Update Failed',
        description: response.data.error,
      });
    }
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err.message,
    });
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
          <p className="edit-btn" onClick={() => handleEditClick(pet)}>
            <FontAwesomeIcon icon={faEdit} />
          </p>
          <p className="delete-btn" onClick={() => handleDeleteClick(pet.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </p>
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
        <div className="table-containers mt-10 mb-10">
          <h1 className="page-title">userPetsForSale</h1> 
          <div className="search-container petssearch">
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
    <CommonTable
      headers={tableHeaders}
      body={filteredData.length === 0 ? (
        <tr>
          <td colSpan={tableHeaders.length} className="no-data-message">
            <p>No pets match your search criteria.</p>
          </td>
        </tr>
      ) : (
        tableBody
      )}
      isLoading={loading}
    />
    {filteredData.length > 0 && (
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
    )}
  </>
)}

<Modal isOpen={modalIsOpen} onClose={handleModalClose}>
  <h2 className="modal-title">Edit Pet</h2>
  {selectedPet && (
    <form
      className="modal-form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('id', selectedPet.id);
        handleUpdate(formData);
      }}
    >
      <div className="modal-field">
        <label className="modal-label">Name</label><br></br>
        <input type="text" name="name" defaultValue={selectedPet.name} required className="modal-input" />
      </div>
      <div className="modal-field">
        <label className="modal-label">Breed</label><br></br>
        <input type="text" name="breed" defaultValue={selectedPet.breed} required className="modal-input" />
      </div>
      <div className="modal-field">
        <label className="modal-label">Age</label><br></br>
        <input type="number" name="age" defaultValue={selectedPet.age} required className="modal-input" />
      </div>
      <div className="modal-field">
        <label className="modal-label">Size</label><br></br>
        <input type="text" name="size" defaultValue={selectedPet.size} required className="modal-input" />
      </div>
      <div className="modal-field descedit">
        <label className="modal-label">Description</label><br></br>
        <textarea name="description" defaultValue={selectedPet.description} required className="modal-textarea" />
      </div>
      <button type="submit" className="editbtnpet">Update Pet</button>
    </form>
  )}
</Modal>

        </div>
      )}
    </>
  );
};

export default UserPets;
