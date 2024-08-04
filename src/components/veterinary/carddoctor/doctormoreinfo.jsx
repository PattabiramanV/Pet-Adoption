import React from 'react';
import { useLocation } from 'react-router-dom';
import './doctormoreinfo.css';

const DoctorMoreInfo = () => {
  const location = useLocation();
  const doctor = location.state?.doctor; // Get doctor data from state

  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  return (
   <>
    <div className="doctorMoreInfoContainer">
      <div className='docterseconddiv'>
      <button onClick={() => window.history.back()} className="backButton">X</button>
      <div className="doctorDetails">
        <div className='doctorpic'>
        <img src={doctor.profile_img} className="doctorImg" alt="Doctor Picture" />
        </div>
        <div className='doctorinfo'>
        <h2 className="doctorName">{doctor.name}</h2>
        <p className="doctorDescription"><strong>Description:</strong> {doctor.description}</p>
        <p className="doctorEducation"><strong>Education:</strong> {doctor.education}</p>
        <p className="doctorClinic"><strong>Clinic:</strong> {doctor.have_a_clinic ? 'Yes' : 'No'}</p>
        <p className="doctorSpecialisation"><strong>Specialisation:</strong> {doctor.specialist}</p>
        <p className="doctorAddress"><strong>Address:</strong> {doctor.address}</p>
        <p className="doctorAddress"><strong>City:</strong> {doctor.city}</p>
        <p className="doctorAddress"><strong>State:</strong> {doctor.state}</p>
        <p className="doctorContact"><strong>Contact No:</strong> {doctor.phone}</p>
        
    
      
        
        
        
       
        <p className="doctorHomeVisiting"><strong>Home Visiting Available:</strong> {doctor.home_visiting_available ? 'Yes' : 'No'}</p>
        <p className="doctorExperience"><strong>Experience:</strong> {doctor.experience} years</p>

        </div>
       </div>
      </div>
    </div>
   </>
  );
};

export default DoctorMoreInfo;
