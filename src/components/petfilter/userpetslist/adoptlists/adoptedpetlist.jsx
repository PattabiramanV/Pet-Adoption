import  { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Loader from './Loader'; 
import CommonTable from '../../../commoncomponent/datatable/DataTable'; 

const Adoptedpetlist = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const userId = profileResponse.data.id;

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_adopted_pets.php?user_id=${userId}`);
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

  const filteredData = adoptedPets.filter(pet =>
    pet.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breeds.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.age.toString().includes(searchTerm) ||
    pet.gender.toLowerCase().includes(searchTerm) ||
    pet.price.toString().includes(searchTerm)
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
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-unknown';
    }
  };

  const tableHeaders = [
    'S.no', 'Image', 'Name', 'Breed', 'Age', 'Gender', 'Price', 'Adoption Time', 'Status'
  ];

  const tableBody = currentData.map((pet, index) => {
    let serialNumber = (currentPage - 1) * petsPerPage + index + 1;
//     let image1;
//   if (pet.photo) {
//     const parsed = JSON.parse(pet.photo);
//     const baseUrl = '/backend/petsapi/hostelimg/';
//     const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);
//     image1 = imageUrls[0];
//   }

    return [
      serialNumber,
      pet.photo ? (
        <img src={`data:image/jpeg;base64,${pet.photo}`} className="pet-details-img" alt={pet.pet_name} />
      ) : (
        <div>No image available</div>
      ),
      pet.pet_name,
      pet.breeds,
      pet.age,
      pet.gender,
      pet.price,
      pet.adoption_time,
      <span className={`status-label ${getStatusClass(pet.status)}`}>
        {pet.status === 'accepted' ? 'Accepted' : pet.status === 'rejected' ? 'Rejected' : pet.status === 'pending' ? 'Pending' : 'Unknown'}
      </span>
    ];
  });

  return (
    <div className="table-container mt-10 mb-10">
      {loading ? (
        <div className="loader-container">
          {/* <Loader /> */}
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {adoptedPets.length === 0 ? (
            <div className="no-data-container">
              <img src="/src/assets/nodata.png" alt="No Data Available" className="no-data-image" />
            </div>
          ) : (
            <>
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
    </div>
  );
};


export default Adoptedpetlist



