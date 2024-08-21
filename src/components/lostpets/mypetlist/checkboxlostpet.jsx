import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { message, Spin } from "antd";
import Loader from '../../Loader/Loader';
import "../lostlistpet.css";

const LostListPet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the current user ID and pet details from the backend
  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem('token');
      try {
        // Fetch current user ID
        const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/lostinguserstable.php`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userData = await userResponse.json();
        console.log('User ID Response data:', userData);

        if (Array.isArray(userData) && userData.length > 0 && userData[0].user_id) {
          setCurrentUserId(userData[0].user_id);
        } else {
          throw new Error("Invalid data format received from the server.");
        }

        // Fetch pet details
        if (location.state && location.state.pet) {
          console.log("Location state pet data:", location.state.pet);
          setPet(location.state.pet);
        } else {
          const petResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/getlostingpet.php`);
          const petData = await petResponse.json();
          console.log("Fetched Pet Data:", petData);
          setPet(petData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        message.error('Failed to fetch data', {
          style: {
            position: 'fixed',
            top: '20px',
            right: '20px',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  if (loading) return <Loader/>;

  if (!pet || currentUserId === null) return <p>Failed to load pet details.</p>;

  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';

  const isUserOwner = String(currentUserId) === String(pet.user_id);

  const updateStatus = async () => {
    try {
      const requestBody = {
        pet_id: pet.id,
        status: 'completed'
      };
      console.log('Sending request with body:', requestBody);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/statuspost.php`, {
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
        message.success({
          content: 'Status completed successfully',
          style: {
            position: 'fixed',
            top: '40px',
            right: '20px',
          },
        });
      } else {
        console.error('Failed to update status:', result.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error({
        content: 'Failed to update status',
        style: {
          position: 'fixed',
          top: '20px',
          right: '20px',
        },
      });
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
                <i className="fas fa-map-marker-alt"></i><strong><FontAwesomeIcon icon={faMapMarkerAlt} /> {pet.location}</strong>
              </p>
            </div>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Pet Type:</strong> {pet.pet_type}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Lost Date:</strong> {pet.lost_date}</p>
            <p><strong>Contact No:</strong> {pet.contact_no}</p>
            <p><strong>Address:</strong> {pet.address}</p>
            <div className="div_description">
              <p className="pet-description">
                <strong>Description: </strong>{pet.description}
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
                  <div className="add-to-cart">
                    <a className="lostpetowner_contact" href= {'tel:${lostpetowner.phone}'}>
                    <button>Contact Owner</button></a></div>
                  <button className="goback-button" onClick={() => navigate("/mypetlostpost")}>
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
