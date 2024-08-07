import React from "react";
import { useLocation } from "react-router-dom";
import "./doctormoreinfo.css";

const DoctorMoreInfo = () => {
  const location = useLocation();
  const doctor = location.state?.doctor; // Get doctor data from state

  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  return (
<<<<<<< HEAD
    <div className="doctor-more-info-container">
      <div className="doctor-details">
        <div className="doctor-pic">
          <img
            src={doctor.profile_img}
            className="doctor-img"
            alt="Doctor Picture"
          />
        </div>
        <div className="doctor-info">
          <div className="div-name-doctormoreinfo">
            <h2 className="doctor-name-doctormoreinfo">{doctor.name}</h2>
          </div>
=======
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
>>>>>>> Ahalya-Vetnarian

          <div className="div-location-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-location-doctormoreinfo">
                <strong>Location:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3> {doctor.city || "Not available"}</h3>
            </div>
          </div>

          <div className="div-contact-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-contact-doctormoreinfo">
                <strong>Contact No:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3>{doctor.phone || "Not available"}</h3>
            </div>
          </div>

          <div className="div-address-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-address-doctormoreinfo">
                <strong>Address:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3>{doctor.address || "Not available"}</h3>
            </div>
          </div>

          <div className="div-education-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-education-doctormoreinfo">
                <strong>Education:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3>{doctor.education || "Not available"}</h3>
            </div>
          </div>

 

          <div className="div-clinic-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-clinic-doctormoreinfo">
                <strong>Clinic:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3> {doctor.have_a_clinic ? "Yes" : "No"}</h3>
            </div>
          </div>

          <div className="div-specialisation-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-specialisation-doctormoreinfo">
                <strong>Specialisation:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3>{doctor.specialist || "Not available"}</h3>
            </div>
          </div>

          <div className="div-home-visiting-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-home-visiting-doctormoreinfo">
                <strong>Home Visiting Available:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3>{doctor.home_visiting_available ? "Yes" : "No"}</h3>
            </div>
          </div>

          <div className="div-experience-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-experience-doctormoreinfo">
                <strong>Experience:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3>
                {doctor.experience
                  ? `${doctor.experience} years`
                  : "Not available"}
              </h3>
            </div>
            
          </div>
          <div className="div-description-doctormoreinfo dot">
            <div className="div_left_doctor">
              <p className="doctor-description-doctormoreinfo">
                <strong>Description:</strong>
              </p>
            </div>
            <div className="div_right_doctor">
              <h3> {doctor.description || "Not available"}</h3>
            </div>
          </div>

          <div className="button-group-doctormoreinfo">
            <button className="contact-doctor-btn doctor-btn">
              Contact Doctor
            </button>
            <button
              onClick={() => window.history.back()}
              className="doctor-btn"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default DoctorMoreInfo;
