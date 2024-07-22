
import React, { useEffect, useState } from "react";
import './doctorpage.css';

const DoctorDetails = (props) => {
  return (
    <div className="doctorContainer">
      <div className="Doccard-container">
        <img src={props.profile} className="doctorImg" alt="Doctor Picture" />
        <h3 className="docname">{props.Doctorname}</h3>
        <div className="Docdetails">
          <h3 className="doctorcontact"><span>Contact No:</span> {props.contactno}</h3>
          <p className="address"><span>Address:</span> {props.address}</p>
        </div>
        <div className="buttons-card">
          <button className="morebutton">More info</button>
        </div>
      </div>
    </div>
  );
}

const DoctorCard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/petadoption/backend/api/retrivevetrinarydocinfoapi.php', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data); // Debugging statement
     
      if (Array.isArray(data)) {
        setUserData(data);
      } else {
        throw new Error('API response is not an array');
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    });
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
        userData.map((user, index) => (
          <DoctorDetails 
            key={index}
            Doctorname={user.name}
            education={user.education}
            description={user.description}
            clinic={user.have_a_clinic}
            profile={user.profile_img} // Ensure this URL is valid
            contactno={user.phone}
            specialisation={user.specialist}
            HomeVisitingAvailable={user.home_visiting_available}
            experience={user.experience}
            address={user.address}
          />
        ))
      ) : (
        <p>No doctors available.</p>
      )}
    </>
  );
};

export default DoctorCard;
