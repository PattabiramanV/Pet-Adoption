import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./doctormoreinfo.css";
import ReviewForm from '../../veterinary/rating/Review';
import StarRating from "../../veterinary/rating/StarRating";
import Tabs from '../../veterinary/tabs/Tabs';
import axios from "axios";


const DoctorMoreInfo = () => {
  const location = useLocation();
  const doctor = location.state?.doctor; 
  const [reviews, setReviews] = useState();

  const token = localStorage.getItem('token');

  if (!doctor) {
    return <p>Doctor not found</p>;
  }


  // Example function for handling review submission
  const handleReviewSubmit = async (reviewData) => {
    try {
      console.log("hello");

      console.log("hi", reviewData);


      // Prepare the data for submission
      const data = {
        ...reviewData,
        doctor_id: doctor.id // Assuming you have a hostel ID to send
      };

      console.log("doctor_id", data);

      // Make the API request
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/doctorrating.php`, // Adjust the URL as needed
        data, // No need to stringify data; axios will handle this
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // Add content-type header
          }
        }
      );

      // Handle the response as needed
      console.log('Review submitted successfully:', response.data);

    } catch (error) {
      // Handle errors as needed
      console.error('Error submitting review:', error);
    }
  };


  //...................Get review datas...................//


  useEffect(() => {
   
    const fetchPetDetails = async () => {
      try {

        // setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/doctorrating.php?doctor_id=${doctor.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status == 'success') {

          setReviews(response.data.data);
        }
        // console.log(response.data);
        // setPet(response.data[0]);
        // setReviews(response.data);

      } catch (error) {
        console.error("Failed to fetch pet details:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchPetDetails();
    // }
  }, []);



  return (
    <>
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
            <StarRating rating={4} readOnly={true} />

            <ReviewForm onSubmit={handleReviewSubmit} />
            <div className="div-education-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-education-doctormoreinfo">
                  <strong>Education:<span className="moreinfo_doctor">{doctor.education}</span></strong>
                </p>
              </div>

            </div>

            <div className="div-specialisation-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-specialisation-doctormoreinfo">
                  <strong>Specialisation:<span className="moreinfo_doctor">{doctor.specialist}</span></strong>
                </p>
              </div>

            </div>

            <div className="div-experience-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-experience-doctormoreinfo">
                  <strong>Experience:<span className="moreinfo_doctor">{doctor.experience} Year</span></strong>
                </p>
              </div>


            </div>


            <div className="div-contact-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-contact-doctormoreinfo">
                  <strong>Contact No:<span className="moreinfo_doctor">{doctor.phone}</span></strong>
                </p>
              </div>

            </div>

            <div className="div-location-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-location-doctormoreinfo">
                  <strong>City: <span className="moreinfo_doctor">{doctor.city}</span></strong>
                </p>
              </div>

            </div>
            <div className="div-address-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-address-doctormoreinfo">
                  <strong>State:<span className="moreinfo_doctor">{doctor.state}</span></strong>
                </p>
              </div>

            </div>


            <div className="div-address-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-address-doctormoreinfo">
                  <strong>Address:<span className="moreinfo_doctor">{doctor.address}</span></strong>
                </p>
              </div>

            </div>



            <div className="div-clinic-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-clinic-doctormoreinfo">
                  <strong>Clinic:<span className="moreinfo_doctor">{doctor.have_a_clinic}</span></strong>
                </p>
              </div>

            </div>



            <div className="div-home-visiting-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-home-visiting-doctormoreinfo">
                  <strong>Home Visiting Available:<span className="moreinfo_doctor">{doctor.home_visiting_available}</span></strong>
                </p>
              </div>

            </div>

            <div className="div-home-visiting-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="available_timing-doctormoreinfo">
                  <strong >Available Time:<span className="moreinfo_doctor">{doctor.available_timing}</span></strong>
                </p>
              </div>

            </div>


            <div className="div-description-doctormoreinfo dot">
              <div className="div_left_doctor">
                <p className="doctor-description-doctormoreinfo">
                  <strong>Description:<span className="moreinfo_doctor">{doctor.description}</span></strong>
                </p>
              </div>

            </div>

            <div className="button-group-doctormoreinfo">
              <a className="contact-doctor-btn" href={`tel:${doctor.phone}`}>
                <button > Contact Doctor</button></a>
              <button
                onClick={() => window.history.back()}
                className=" doctor-btn"
              >
                Go Back
              </button>


            </div>
          </div>
        </div>
      </div>
      {reviews && (

        <Tabs hostelReviews={reviews} />


      )}

    </>
  );
};

export default DoctorMoreInfo;




