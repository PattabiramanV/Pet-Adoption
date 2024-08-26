
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import Loader from '../../Loader/Loader';
import { InlineShareButtons } from 'sharethis-reactjs';

import "../lostlistpet.css";

const LostListPet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem('token');
      try {
        const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/lostinguserstable.php`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userData = await userResponse.json();
        if (Array.isArray(userData) && userData.length > 0 && userData[0].user_id) {
          setCurrentUserId(userData[0].currentUserId);
        } else {
          throw new Error("Invalid data format received from the server.");
        }

        if (location.state && location.state.pet) {
          setPet(location.state.pet);
        } else {
          const petResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/getlostingpet.php`);
          const petData = await petResponse.json();
          setPet(petData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        message.error('Failed to fetch data1', {
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


console.log('pet',pet);
console.log('currentUserId',currentUserId);


  if (!pet || currentUserId === null) return <p>Failed to load pet details.</p>;

  const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';
  const isUserOwner = String(currentUserId) === String(pet.user_id);

  const updateStatus = async () => {
    try {
      const requestBody = {
        pet_id: pet.id,
        status: 'completed'
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/statuspost.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
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
        content: 'Failed to update statuses',
        style: {
          position: 'fixed',
          top: '20px',
          right: '20px',
        },
      });
    }
  };

  return (
    <section className="lost_pet-detail-page">
      <div className="lost_pet-detail-container-main">
        <div className="lost_pet-detail-container">
          <div className="lost_pet-images">
            {imageSrc && <img src={imageSrc} alt={pet.name} className="lost_main-pet-image" />}
          </div>
          <div className="lost_pet-details">
            <div className="lost_div_name">
              <h2 className="lost_pet-name">{pet.name}</h2>
            </div>
            <div className="lost_div_location">
              <p className="lost_pet-location">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>{pet.location}</strong>
              </p>
            </div>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Pet Type:</strong> {pet.pet_type}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Lost Date:</strong> {pet.lost_date}</p>
            <p><strong>Contact No:</strong> {pet.contact_no}</p>
            <p><strong>Address:</strong> {pet.address}</p>
            <div className="lost_div_description">
              <p className="lost_pet-description">
                <strong>Description: </strong>{pet.description}
              </p>
            </div>
            <div className="div_social_med_lost_pet">
                <InlineShareButtons
                    config={{
                      alignment: 'center',
                      color: 'social',
                      enabled: true,
                      font_size: 16,
                      language: 'en',
                      networks: ['whatsapp', 'facebook', 'twitter', 'email'],
                      padding: 12,
                      radius: 50,
                      show_total: false,
                      size: 40,
                    }}
                  />
                </div>
            <div className="lost_btn_for_message">
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
                  {/* <InlineShareButtons
                    config={{
                      alignment: 'center',
                      color: 'social',
                      enabled: true,
                      font_size: 16,
                      language: 'en',
                      networks: ['whatsapp', 'facebook', 'twitter', 'email'],
                      padding: 12,
                      radius: 50,
                      show_total: false,
                      size: 40,
                    }}
                  /> */}
                </>
              ) : (
                <>

       
                  <div className="lost_add-to-cart">
                    <a className="lostpetowner_contact" href={`tel:${pet.contact_no}`}>
                      <button>Contact Owner</button>
                    </a>
                  </div>
                  <button className="lost_goback-button" onClick={() => navigate("/mypetlostpost")}>
                    Go Back
                  </button>
                 
                </>
              )}
            </div>
          </div>
        </div>
        {loading && <Loader/>}
      </div>
    </section>
  );
};

export default LostListPet;  





// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useParams to get the pet ID from URL
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// import { message } from "antd";
// import Loader from '../../Loader/Loader';
// import { InlineShareButtons } from 'sharethis-reactjs';

// import "../lostlistpet.css";

// const LostListPet = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams(); // Get the pet ID from the URL
//   const [pet, setPet] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       let token = localStorage.getItem('token');
//       try {
//         const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/lostinguserstable.php`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const userData = await userResponse.json();
//         console.log(userData);
        
//         if (Array.isArray(userData) && userData.length > 0 && userData[0].user_id) {
//           setCurrentUserId(userData[0].user_id);
//         } else {
//           throw new Error("Invalid data format received from the server.");
//         }

//         if (location.state && location.state.pet) {
//           setPet(location.state.pet);
//         } else {
//           const petResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/getlostingpet.php?id=${id}`);
//           const petData = await petResponse.json();
//           if (petData) {
//             setPet(petData);
//           } else {
//             throw new Error("Pet not found.");
//           }
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         message.error('Failed to fetch data', {
//           style: {
//             position: 'fixed',
//             top: '20px',
//             right: '20px',
//           },
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [location.state, id]);

//   if (loading) return <Loader />;

//   if (!pet || currentUserId === null) return <p>Failed to load pet details.</p>;

//   const imageSrc = pet.photo ? `data:image/jpeg;base64,${pet.photo}` : '';
//   const isUserOwner = String(currentUserId) === String(pet.user_id);

//   const updateStatus = async () => {
//     try {
//       const requestBody = {
//         pet_id: pet.id,
//         status: 'completed'
//       };

//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/model/statuspost.php`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       if (result.success) {
//         setPet((prevPet) => ({ ...prevPet, status: 'completed' }));
//         message.success({
//           content: 'Status completed successfully',
//           style: {
//             position: 'fixed',
//             top: '40px',
//             right: '20px',
//           },
//         });
//       } else {
//         console.error('Failed to update status:', result.message);
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       message.error({
//         content: 'Failed to update status',
//         style: {
//           position: 'fixed',
//           top: '20px',
//           right: '20px',
//         },
//       });
//     }
//   };

//   // Generate the shareable link for the pet details
//   const shareableLink = `${window.location.origin}/lostpet/${pet.id}`;

//   return (
//     <section className="lost_pet-detail-page">
//       <div className="lost_pet-detail-container-main">
//         <div className="lost_pet-detail-container">
//           <div className="lost_pet-images">
//             {imageSrc && <img src={imageSrc} alt={pet.name} className="lost_main-pet-image" />}
//           </div>
//           <div className="lost_pet-details">
//             <div className="lost_div_name">
//               <h2 className="lost_pet-name">{pet.name}</h2>
//             </div>
//             <div className="lost_div_location">
//               <p className="lost_pet-location">
//                 <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>{pet.location}</strong>
//               </p>
//             </div>
//             <p><strong>Gender:</strong> {pet.gender}</p>
//             <p><strong>Pet Type:</strong> {pet.pet_type}</p>
//             <p><strong>Age:</strong> {pet.age}</p>
//             <p><strong>Lost Date:</strong> {pet.lost_date}</p>
//             <p><strong>Contact No:</strong> {pet.contact_no}</p>
//             <p><strong>Address:</strong> {pet.address}</p>
//             <div className="lost_div_description">
//               <p className="lost_pet-description">
//                 <strong>Description: </strong>{pet.description}
//               </p>
//             </div>
//             <div className="lost_btn_for_message">
//               {isUserOwner ? (
//                 <>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={pet.status === 'completed'}
//                       onChange={updateStatus}
//                       name="status"
//                     />
//                     {pet.status === 'completed' ? 'Completed' : 'Pending'}
//                   </label>
//                   <InlineShareButtons
//                     config={{
//                       alignment: 'center',
//                       color: 'social',
//                       enabled: true,
//                       font_size: 16,
//                       language: 'en',
//                       networks: ['whatsapp', 'facebook', 'twitter', 'email'],
//                       padding: 12,
//                       radius: 50,
//                       show_total: false,
//                       size: 40,
//                       url: shareableLink,
//                       title: `Lost Pet: ${pet.name}`,
//                       description: `Help us find our lost pet, ${pet.name}, last seen at ${pet.location}. Please share if you have any information.`,
//                     }}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <div className="lost_add-to-cart">
//                     <a className="lostpetowner_contact" href={`tel:${pet.contact_no}`}>
//                       <button>Contact Owner</button>
//                     </a>
//                   </div>
//                   <button className="lost_goback-button" onClick={() => navigate("/mypetlostpost")}>
//                     Go Back
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LostListPet;
