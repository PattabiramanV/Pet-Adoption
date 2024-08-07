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
  );
};

export default DoctorMoreInfo;
