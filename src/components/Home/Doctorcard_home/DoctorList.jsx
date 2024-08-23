import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import Loader from '../../Loader/Loader'; // Import your custom Loader component
import "./DoctorList.css"; // Import your CSS file

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost/petadoption/backend/api/retrivevetrinarydocinfoapi.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader /> {/* Use your custom loader component */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const lastThreeDoctors = doctors.slice(-3); // Get the last three doctors

  return (
    <div className="doctor-list">
      <h1 className="doctor-list-name">
        Meet Our <span>Veterinarians</span>
      </h1>
      <div className="doctor-list-container">
        {lastThreeDoctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
