import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../../veterinary/carddoctor/Doctorcard/DoctorCard.css"; // Import your CSS file

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); // Hook for navigation

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
            {/* <div className="div_title"> */}
              <h3 className="title_doctorcard">Education :<span className="doctorcard-item">{doctor.education}</span></h3>
            {/* </div> */}
            {/* <div className="div_value"> */}
              {/* <h3 className="value_doctorcard">{doctor.education}</h3> */}
            {/* </div> */}
          </div>

          <div className="info-item">
            {/* <div className="div_title"> */}
              <h3 className="title_doctorcard">Specialist :<span className="doctorcard-item">{doctor.specialist}</span></h3>
            {/* </div> */}
            {/* <div className="div_value"> */}
              {/* <h3 className="value_doctorcard">{doctor.specialist}</h3> */}
            {/* </div> */}
          </div>

          <div className="info-item">
            {/* <div className="div_title"> */}
              <h3 className="title_doctorcard">Experience :<span className="doctorcard-item">{doctor.experience} Year</span> </h3>
            {/* </div> */}
            {/* <div className="div_value"> */}
              {/* <h3 className="value_doctorcard">{doctor.experience}</h3> */}
            {/* </div> */}
          </div>



          {/* <div className="info-item">
            <div className="div_title">
              <h3 className="title_doctorcard">Clinic :</h3>
            </div>
            <div className="div_value">
              <h3 className="value_doctorcard">{doctor.have_a_clinic}</h3>
            </div>
          </div>

          <div className="info-item">
            <div className="div_title">
              <h3 className="title_doctorcard">Phone :</h3>
            </div>
            <div className="div_value">
              <h3 className="value_doctorcard">{doctor.phone}</h3>
            </div>
          </div>

          <div className="info-item">
            <div className="div_title">
              <h3 className="title_doctorcard">Availability :</h3>
            </div>
            <div className="div_value">
              <h3 className="value_doctorcard">{doctor.available_timing}</h3>
            </div>
          </div>
 */}
        </div>
        <div className="btn">
          <button className="more-info-btn" onClick={handleMoreInfoClick}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
