import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../Loader/Loader';
import CommonTable from '../../../commoncomponent/datatable/DataTable';
import '../adoptlists/adoptedpets.css'; 
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck,faSearch } from '@fortawesome/free-solid-svg-icons';



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
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/reject_adoption_request.php`, { requestId });
      setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Accepted') return 'status-accepted';
    if (status === 'Rejected') return 'status-rejected';
    return 'status-pending';
  };

  return (
    <>
      {loading ? (
        <div><Loader /></div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="table-container mt-10 mb-10">
          {filteredRequests.length === 0 ? (
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
                headers={['S.No', 'Name', 'Address', 'Adoption Time',  'Action']}
                body={currentRequests.map((request, index) => [
                  (currentPage - 1) * requestsPerPage + index + 1,
                  request.name,
                  request.address,
                  request.adoption_time,
                  <>
                  <div className="ARbutton">                    <button className='accepted' onClick={() => handleAccept(request.request_id)}> <img src="/src/assets/tick.webp" alt="" srcset="" />

</button>
                    <button className='rejected' onClick={() => handleReject(request.request_id)}> <img src="/src/assets/xmark.png" alt="" srcset="" />

</button>
</div>

                  </>
                ])}
              />
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AdoptionRequests;
