import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
          const response = await fetch(
            "http://localhost/petadoption/backend/model/getlostingpet.php"
          );
          const data = await response.json();
          console.log("Fetched Pet Data:", data); // Debugging output
          setPet(data);
        } catch (error) {
          console.error("Failed to fetch pet details:", error);
        }
      };
      fetchPetDetails();
    }
  }, [location.state]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  let imageSrc = `data:image/jpeg;base64,${pet.photo}`;
  console.log("Image Source:", imageSrc); // Debugging output

  return (
    <section className="pet-detail-page">
      <div className="pet-detail-container-main">
        <div className="pet-detail-container">
          <div className="pet-images">
            <img src={imageSrc} alt={pet.name} className="main-pet-image" />
          </div>
          <div className="pet-details">
            <div className="div_name">
              <h2 className="pet-name">{pet.name}</h2>
            </div>
            <div className="div_location">
              <p className="pet-location">
                <i className="fas fa-map-marker-alt"></i><strong>Location:</strong> {pet.location}
              </p>
            </div>
            

            <div className="pet-specifications">
              <div className="pet-card-info">
                <div className="pet_left_de">
                  <p><strong>Gender:</strong> {pet.gender}</p>
                  <p><strong>Pet Type:</strong> {pet.pet_type}</p>
                </div>
                <div className="pet_right_de">
                  <p><strong>Age:</strong> {pet.age}</p>
                  <p><strong>Lost Date:</strong> {pet.lost_date}</p>
                </div>
            </div>
            </div>
                <p><strong>Contact No:</strong> {pet.contact_no}</p>
                <p><strong>Address:</strong> {pet.address}</p>
            <div className="div_description">
              <p className="pet-description">
                <strong></strong> {pet.description}
              </p>
            </div>
            <div className="btn_for_message">
              <button className="add-to-cart">Contact Owner</button>
              <button className="back-button" onClick={() => navigate("/lostpetlisting")}> 
                Go Back
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostListPet;












