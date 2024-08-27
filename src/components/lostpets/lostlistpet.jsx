import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader';
import "./lostlistpet.css";

const LostListPet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (location.state && location.state.pet) {
      setPet(location.state.pet);
    } else {
      const fetchPetDetails = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/getlostingpet.php`);
          const data = await response.json();
          console.log("Fetched Pet Data:", data); 
          setPet(data);
        } catch (error) {
          console.error("Failed to fetch pet details:", error);
        }
      };
      fetchPetDetails();
    }
  }, [location.state]);


  let imageSrc = `data:image/jpeg;base64,${pet.photo}`;
  console.log("Image Source:", imageSrc); 

  return (
    <section className="lost_pet-detail-page">
      <div className="lost_pet-detail-container-main">
        <div className="lost_pet-detail-container">
          <div className="lost_pet-images">
            <img src={imageSrc} alt={pet.name} className="lost_main-pet-image" />
          </div>
          <div className="lost_pet-details">
            <div className="lost_div_name">
              <h2 className="lost_pet-name">{pet.name}</h2>
            </div>
            <div className="lost_div_location">
              <p className="lost_pet-location">
                <i className="fas fa-map-marker-alt"></i>Location: {pet.location}
              </p>
            </div>

            <div className="lost_pet-specifications">
              <div className="lost_pet-card-info">
                <div className="lost_pet_left_de">
                  <p>Gender: {pet.gender}</p>
                  <p>Pet Type: {pet.pet_type}</p>
                </div>
                <div className="lost_pet_right_de">
                  <p>Age: {pet.age}</p>
                  <p>Lost Date: {pet.lost_date}</p>
                </div>
              </div>
            </div>
            <p>Contact No: {pet.contact_no}</p>
            <p>Address: {pet.address}</p>
            <div className="lost_div_description">
              <p className="lost_pet-description">
                {pet.description}
              </p>
            </div>
            <div className="lost_btn_for_message">
              <button className="lost_add-to-cart">Contact Owner</button>
              <button className="lost_goback-button" onClick={() => navigate("/lostpetlisting")}> 
                Go Back
              </button>
            </div>
          </div>
        </div>
        {loading && <Loader/>}
      </div>
    </section>
  );
};

export default LostListPet;
