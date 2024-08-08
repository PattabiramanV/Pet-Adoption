import { useState, useEffect } from 'react';
import axios from 'axios';
import './adoptedpets.css';
import Header from '../../Siteframe/Header';
import Footer from '../../Siteframe/Footer';
import { Pagination } from 'antd'; 

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost/petadoption/backend/petsapi/get_adoption_requests.php')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => console.error('Error fetching adoption requests:', error));
  }, []);

  const handleAccept = (requestId) => {
    axios.post('http://localhost/petadoption/backend/petsapi/accept_adoption_request.php', { requestId })
      .then(() => {
        // Optionally notify other users here
        setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
      })
      .catch(error => console.error('Error accepting request:', error));
  };

  const handleReject = (requestId) => {
    axios.post('http://localhost/petadoption/backend/petsapi/reject_adoption_request.php', { requestId })
      .then(() => {
        alert('Request rejected.');
        setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
      })
      .catch(error => console.error('Error rejecting request:', error));
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  return (
    <>
      <Header />
      <div className="adopted-pets-table widthBalance">
        <h1>Adoption Requests</h1>
        <table className="adoption">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>User Name</th>
              <th>Address</th>
              <th>Adoption Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(requests) && currentRequests.length > 0 ? (
              currentRequests.map(request => (
                <tr key={request.request_id}>
                  <td>{request.pet_name}</td>
                  <td>{request.user_name}</td>
                  <td>{request.address}</td>
                  <td>{request.adoption_time}</td>
                  <td>
                    <div className="requestbutton">
                      <button className='accept' onClick={() => handleAccept(request.request_id)}>Accept</button>
                      <button className='reject' onClick={() => handleReject(request.request_id)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No adoption requests available.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={requestsPerPage}
          total={requests.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </>
  );
};

export default AdoptionRequests;
