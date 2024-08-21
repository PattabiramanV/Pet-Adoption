import { useState, useEffect } from 'react';
import axios from 'axios';

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/petadoption/backend/pets_api/get_adoption_requests.php')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => console.error('Error fetching adoption requests:', error));
  }, []);

  const handleAccept = (requestId) => {
    axios.post('http://localhost/petadoption/backend/pets_api/accept_adoption_request.php', { requestId })
      .then(() => {
        alert('Request accepted and other users notified.');
        setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
      })
      .catch(error => console.error('Error accepting request:', error));
  };

  const handleReject = (requestId) => {
    axios.post('http://localhost/petadoption/backend/pets_api/reject_adoption_request.php', { requestId })
      .then(() => {
        alert('Request rejected.');
        setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
      })
      .catch(error => console.error('Error rejecting request:', error));
  };

  return (
    <div className="adopted-pets-table">
      <h1>Adoption Requests</h1>
      <table>
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
          {Array.isArray(requests) && requests.length > 0 ? (
            requests.map(request => (
              <tr key={request.request_id}>
                <td>{request.pet_name}</td>
                <td>{request.user_name}</td>
                <td>{request.address}</td>
                <td>{request.adoption_time}</td>
                <td>
                  <button onClick={() => handleAccept(request.request_id)}>Accept</button>
                  <button onClick={() => handleReject(request.request_id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No adoption requests available.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequests;
