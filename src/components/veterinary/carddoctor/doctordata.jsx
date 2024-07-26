import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './doctorpage.css';

const DoctorCard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/backend/api/retrivevetrinarydocinfoapi.php', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setUserData(data);
        } else {
          throw new Error('API response is not an array');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {userData.length > 0 ? (
        userData.map((user) => (
          <div key={user.id} className="doctorContainer">
            <div className="Doccard-container">
              <img
                src={user.profile_img}
                className="doctorImg"
                alt="Doctor Picture"
                onClick={() => navigate('/doctormoreinfo', { state: { doctor: user } })} // Arrow function used here
              />
              <h3 className="docname">{user.name}</h3>
              <div className="Docdetails">
                <h3 className="doctorcontact"><span>Contact No:</span> {user.phone}</h3>
                <p className="address"><span>Address:</span> {user.address}</p>
              </div>
              <div className="buttons-card">
                <button
                  onClick={() => navigate('/doctormoreinfo', { state: { doctor: user } })} // Arrow function used here
                  className="morebutton">
                  More info
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors available.</p>
      )}
    </>
  );
};

export default DoctorCard;
