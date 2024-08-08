
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../lostlistpet.css";


const LostListPet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch the current user ID from the backend
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      let token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost/petadoption/backend/model/lostinguserstable.php', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log('User ID Response data:', data);

        if (Array.isArray(data) && data.length > 0 && data[0].user_id) {
          setCurrentUserId(data[0].user_id);
        } else {
          setCurrentUserId(null);
          console.error("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setCurrentUserId(null);
      }
    };

    fetchCurrentUserId();
  }, []);

  // Fetch the pet details from the backend
  useEffect(() => {
    if (location.state && location.state.pet) {
      console.log("Location state pet data:", location.state.pet);
      setPet(location.state.pet);
    } else {
      const fetchPetDetails = async () => {
        try {
          const response = await fetch("http://localhost/petadoption/backend/model/getlostingpet.php");
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

  if (!pet || currentUserId === null) {
    return <p>Loading pet details...</p>;
  }

  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';

  console.log("Pet Data:", pet);

  const isUserOwner = String(currentUserId) === String(pet.user_id);
  const updateStatus = async () => {
    try {
      const requestBody = {
        pet_id: pet.id,
        status: 'completed'
      };
      console.log('Sending request with body:', requestBody);
  
      const response = await fetch('http://localhost/petadoption/backend/model/statuspost.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Update Status Response:', result);
      if (result.success) {
        setPet((prevPet) => ({ ...prevPet, status: 'completed' }));
      } else {
        console.error('Failed to update status:', result.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <section className="pet-detail-page">
      <div className="pet-detail-container-main">
        <div className="pet-detail-container">
          <div className="pet-images">
            {imageSrc && <img src={imageSrc} alt={pet.name} className="main-pet-image" />}
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
                <strong>Description:</strong> {pet.description}
              </p>
            </div>
            <div className="div_user_id">
              <p className="pet-user-id"></p>
            </div>
            <div className="btn_for_message">
              {isUserOwner ? (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={pet.status === 'completed'}
                      onChange={updateStatus}
                      name="status"
                    />
                    {pet.status === 'completed' ? 'Completed' : 'Pending'}
                  </label>
                </>
              ) : (
                <>
                  <button className="add-to-cart">Contact Owner</button>
                  <button className="back-button" onClick={() => navigate("/mypetlostpost")}>
                    Go Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostListPet;