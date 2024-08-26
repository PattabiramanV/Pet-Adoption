import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../Loader/Loader';
import CommonTable from '../../../commoncomponent/datatable/DataTable';
import '../adoptlists/adoptedpets.css'; 
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { notification } from 'antd';

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_adoption_requests.php`);
        setRequests(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching adoption requests');
        console.error('Error fetching adoption requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleAccept = async (requestId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/accept_adoption_request.php`, { requestId });
      setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
      notification.success({
        message: 'Request Accepted',  
        description: 'The adoption request has been successfully Accepted.',
      })
    } catch (error) {
      console.error('Error accepting request:', error);
      notification.error({
        message: 'Request Accepted Failed',
        description: 'There was an error Accepted the adoption request. Please try again.',
      });
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/reject_adoption_request.php`, { requestId });
      setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
      notification.success({
        message: 'Request Rejected',
        description: 'The adoption request has been successfully rejected.',
      })
    } catch (error) {
      console.error('Error rejecting request:', error);
      notification.error({
        message: 'Request Rejection Failed',
        description: 'There was an error rejecting the adoption request. Please try again.',
      });
    }
  };

  return (
    <>
      {loading ? (
        <div><Loader /></div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="table-container mt-10 mb-10">
          <div className="search-container">
            {searchTerm === '' && (
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            )}
            <div  id='requestserach'><input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input searchBox "
             
            />
            </div>
            
          </div>
          
          <div className="table-content">
            <CommonTable
              headers={['S.No', 'Name', 'Address', 'Adoption Time', 'Action']}
              body={
                filteredRequests.length === 0 && searchTerm !== '' ? (
                
               
                    <div key="no-data">
                        Data not found in table
                    </div>
              
                ) : (
                  currentRequests.map((request, index) => [
                    (currentPage - 1) * requestsPerPage + index + 1,
                    request.name,
                    request.address,
                    request.adoption_time,
                    <div className="ARbutton" key={request.request_id}>
                      <button className='accepted' onClick={() => handleAccept(request.request_id)}>
                        <img src="/src/assets/tick.webp" alt="Accept" />
                      </button>
                      <button className='rejected' onClick={() => handleReject(request.request_id)}>
                        <img src="/src/assets/xmark.png" alt="Reject" />
                      </button>
                    </div>
                  ])
                )
              }
            />
            {filteredRequests.length > requestsPerPage && (
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(filteredRequests.length / requestsPerPage)}
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
          </div>
        </div>
      )}
    </>
  );
};

export default AdoptionRequests;
