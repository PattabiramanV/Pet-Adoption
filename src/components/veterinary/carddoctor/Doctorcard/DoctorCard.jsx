import React from "react";

import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


import "./DoctorCard.css"; // Import your CSS file

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); 
  // Hook for navigation


  // Example function for handling review submission

  const handleMoreInfoClick = () => {
    navigate("/doctormoreinfo", { state: { doctor } });
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-header">
        <img
          src={doctor.profile_img}
          alt={doctor.name}
          className="doctor-card-image"
        />
      </div>

      <div className="doctor-card-body">
        <div className="div_name_location">
          <div className="doctor-name">
            <h1 className="doctor-card-name">{doctor.name}</h1>
          </div>
          <div className="doctor-address">
            <h2>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="doctor-locaions"> {doctor.city} </span>
            </h2>
          </div>
         
        </div>
        <div className="doctor-card-info">

        <div className="info-item">
          
              <h3 className="title_doctorcard">Education :<span className="doctorcard-item">{doctor.education}</span></h3>
          
          </div>

          <div className="info-item">
            
              <h3 className="title_doctorcard">Specialist :<span className="doctorcard-item">{doctor.specialist}</span></h3>
           
          </div>

          <div className="info-item">
           
              <h3 className="title_doctorcard">Experience :<span className="doctorcard-item">{doctor.experience} Years</span></h3>
          
          </div>

          <div className="info-item">
          
            <h3 className="title_doctorcard">
                Availability : 
                <span className="doctorcard-item">
                    {moment(doctor.available_timing_from).format('hh:mm A')} - {moment(doctor.available_timing_to).format('hh:mm A')}
                </span>
            </h3>
       
          </div>



         
        </div>
        <div className="btn">
          <button className="more-info-btn" onClick={handleMoreInfoClick}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
