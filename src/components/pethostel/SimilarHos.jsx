// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import ReactCountryFlag from 'react-country-flag';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// // import './PetInfo.css';
// import { getCode } from 'country-list';
// // import Loader from '../../Loader/Loader';
// import { notification } from 'antd';
// import CardView from './HosCard';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// // import CustomPaging from './InfoSlider';


// const PetDetailsRoute = ({hostels}) => {
//     console.log(hostels);
//     // return;
// //   const { id } = useParams();
// //   const [pet, setPet] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [similarPets, setSimilarPets] = useState([]);
// //   const [loading, setLoading] = useState(true);


// //   const fetchPetData = async () => {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       setError("No token found");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_pet_details.php`, {
// //         params: { id },
// //         headers: { 'Authorization': `Bearer ${token}` },
// //       });

// // console.log(response.data);

// //       if (response.data.message) {
// //         console.log(response.data.message);
        
// //         setError(response.data.message);
// //         setPet(null);
// //       } else {
// //         setPet(response.data.pet);
// //         setSimilarPets(response.data.similar_pets);
// //         setError(null);
// //       }
// //     } catch (err) {
// //       setError('Error fetching pet details');
// //       console.error('Error fetching pet details:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchUserProfile = async () => {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       setError("No token found");
// //       return;
// //     }

// //     try {
// //       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
// //         headers: { 'Authorization': `Bearer ${token}` },
// //       });
// //       setUserProfile(response.data);
// //     } catch (err) {
// //       console.error("Error fetching user profile:", err);
// //     }
// //   };
 
//   const CustomPrevArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <div className={`${className} custom-prev-arrow`} onClick={onClick}>
//         <img src="../../../src/assets/left-arrow.jpg" alt="Previous" />
//       </div>
//     );
//   };

//   const CustomNextArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <div className={`${className} custom-next-arrow`} onClick={onClick}>
//         <img src="../../../src/assets/right-arrow.png" alt="Next" />
//       </div>
//     );
//   };

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };


// //   useEffect(() => {
// //     fetchPetData();
// //     fetchUserProfile();
// //      window.scrollTo(0, 0);
// //   }, [id]);
  
//     const sliderSettings1 = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,

//   };
// //   const handleAdoptNow = async () => {
// //   try {
// //     const result = await Swal.fire({
// //       title: 'Do you want to adopt this pet?',
// //       showCancelButton: true,
// //       confirmButtonText: 'Yes',
// //       cancelButtonText: 'No',
// //     });
    
// //     if (result.isConfirmed) {
// //       const addressResult = await Swal.fire({
// //         title: 'Select Address',
// //         html: `
// //           <input type="radio" id="existingAddress" name="addressOption" value="existing" checked>
// //           <label for="existingAddress">Use existing address</label>
// //           <div id="existingAddressDisplay" style="margin-bottom: 10px;">
// //             <strong>Address:</strong> ${userProfile.address}, ${userProfile.city}, ${userProfile.state}
// //           </div><br>
// //           <input type="radio" id="newAddressOption" name="addressOption" value="new">
// //           <label for="newAddressOption">Provide new address</label><br>
// //           <div id="newAddressFields" style="display:none;">
// //             <input type="text" id="newAddress" class="swal2-input" placeholder="Address" required>
// //             <input type="text" id="newState" class="swal2-input" placeholder="State" required>
// //             <input type="text" id="newCity" class="swal2-input" placeholder="City" required>
// //           </div>`,
// //         showCancelButton: true,
// //         preConfirm: () => {
// //           const addressOption = document.querySelector('input[name="addressOption"]:checked').value;

// //           if (addressOption === 'new') {
// //             const newAddress = document.getElementById('newAddress').value;
// //             const newState = document.getElementById('newState').value;
// //             const newCity = document.getElementById('newCity').value;

// //             if (!newAddress || !newState || !newCity) {
// //               Swal.showValidationMessage('Please fill out all required fields.');
// //               return false; 
// //             }

// //             return {
// //               address: newAddress,
// //               state: newState,
// //               city: newCity,
// //             };
// //           }

// //           return {
// //             address: userProfile.address,
// //             state: userProfile.state,
// //             city: userProfile.city,
// //           };
// //         },
// //         didOpen: () => {
// //           const existingAddressRadio = document.getElementById('existingAddress');
// //           const newAddressRadio = document.getElementById('newAddressOption');
// //           const newAddressFields = document.getElementById('newAddressFields');
// //           const existingAddressDisplay = document.getElementById('existingAddressDisplay');

// //           // Initially show existing address
// //           existingAddressDisplay.style.display = 'block';
// //           newAddressFields.style.display = 'none';

// //           existingAddressRadio.addEventListener('change', () => {
// //             if (existingAddressRadio.checked) {
// //               existingAddressDisplay.style.display = 'block';
// //               newAddressFields.style.display = 'none';
// //             }
// //           });

// //           newAddressRadio.addEventListener('change', () => {
// //             if (newAddressRadio.checked) {
// //               newAddressFields.style.display = 'block';
// //               existingAddressDisplay.style.display = 'none';
// //             }
// //           });
// //         }
// //       });

// //       if (!result.isConfirmed) {
// //         return;
// //       }

// //       const addressData = result.value;

// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         Swal.fire('Error', 'No token found for authorization.', 'error');
// //         return;
// //       }

// //       try {
// //         const ownerResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/pet_owner.php`, {
// //           params: { id: pet.user_id },
// //         });
// //         const userEmail = ownerResponse.data.email;

// //         const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //           },
// //         });
// //         const userProfile = profileResponse.data;

// //         const emailResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/send_email.php`,
// //           new URLSearchParams({
// //             email: userEmail,
// //             userName: userProfile.username,
// //             userContact: userProfile.phone,
// //             gender: userProfile.gender,
// //             city: addressData.city || userProfile.city,
// //             state: addressData.state || userProfile.state,
// //             address: addressData.address || userProfile.address
// //           }),
// //           {
// //             headers: {
// //               'Content-Type': 'application/x-www-form-urlencoded',
// //             },
// //           }
// //         );

// //         if (emailResponse.data.success) {
// //           notification.success({
// //             message: 'Request successfully sent to the owner',
// //             description: 'The owner will review your request. Please be patient.',
// //           });

// //           try {
// //             const updateResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/adopt_pet.php`,
// //               new URLSearchParams({
// //                 id: pet.id,
// //                 user_id: userProfile.id,
// //                 address: addressData.address || '',
// //                 state: addressData.state || '',
// //                 city: addressData.city || '',
// //                 status: 'pending'
// //               }),
// //               {
// //                 headers: {
// //                   'Content-Type': 'application/x-www-form-urlencoded',
// //                 },
// //               }
// //             );

// //             if (updateResponse.data.success) {
// //               setPet({ ...pet });
// //             } else {
// //               Swal.fire('Error', 'There was an issue updating the adoption status.', 'error');
// //             }
// //           } catch (error) {
// //             console.error('Error updating adoption status:', error);
// //             Swal.fire('Error', 'There was an issue updating the adoption status.', 'error');
// //           }
// //         } else {
// //           Swal.fire('Error', emailResponse.data.message || 'There was an issue sending the email.', 'error');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching pet owner profile:', error);
// //         Swal.fire('Error', 'There was an issue fetching the pet owner profile.', 'error');
// //       }
// //     }
// //   } catch (error) {
// //     console.error('Error in adoption process:', error);
// //     Swal.fire('Error', 'There was an issue with the adoption process.', 'error');
// //   }
// // };

// //   if (loading) return <Loader />;
// //   if (error) return <div>{error}</div>;
// //   if (!pet) return null;

// //   const countryCode = getCode(pet.state);
// // console.log(pet);
// // const parsed=JSON.parse(pet.photo);
// // console.log(parsed);

// // const baseUrl = '/backend/petsapi/hostelimg/'; 
// //   const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);
// // console.log(imageUrls);




//   return (
//     <div className="pet-info-page">
//      {/* <div className="pet-image-name-info">
//         <div className="pet-image-info"> */}
//         {/* <Slider {...sliderSettings1}>
//             {pet.photos && pet.photos.map((photo, index) => (
//               <div key={index}>
//                 <img src={`data:image/jpeg;base64,${photo}`} className="pet-details-img" alt={`Pet Slide ${index + 1}`} />
//               </div>
//             ))}
//           </Slider> */}
//         {/* </div>
//         <div className="pet-image-name">
//           <h3 className="pet-details-name">{pet.pet_name}</h3>
//           <div className="maps">
//             <div className="flag">
//               {countryCode && <ReactCountryFlag countryCode={countryCode} svg className='map' />}
//             </div>
//             <h3 className="loca-info">
//               <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker" />
//               <span>{pet.city}</span>
//             </h3>
//           </div>
//         </div>
//       </div>
//       <div className="slider-content">
//         <div className="Infos"> */}
//           {/* {pet.photo ? (
//             <img src={`data:image/jpeg;base64,${pet.photo}`} className="slider-img" alt={pet.pet_name} />
//           ) : (
//             <div>No image available</div>
//           )} */}
//           {/* <CustomPaging  imageUrls={imageUrls} />
//         </div>
//         <div className="info-description">
//           <h3>{pet.pet_name} Story</h3>
//           <p>{pet.description}</p>

//           <div className="healthDetails">
//             <div className="live health">
//               <img className="healthImg" src="/src/assets/child_care.png" alt="Child Care" />
//               <span>Can live with other children of any age</span>
//             </div>
//             <div className="vacc-info health">
//               <img className="healthImg" src="/src/assets/vaccines.png" alt="Vaccines" />
//               <span>Vaccinated</span>
//             </div>
//             <div className="house-info health">
//               <img className="healthImg" src="/src/assets/warehouse.png" alt="House-Trained" />
//               <span>House-Trained</span>
//             </div>
//             <div className="price-info health">
//             <p>Price: <span>₹{Number(pet.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
//             </div>
//             <div className="buttons adoptNow">
//               <button className="adopt" onClick={handleAdoptNow}>Adopt Now</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="petPerson">
//         <div className="gender-info">
//           <img className="genderinfo" src="/src/assets/female.png" alt="Gender" />
//           <img className="semi" src="/src/assets/Semicircular.png" alt="" />
//           <div className="infos">
//             <p className="info-title">Gender</p>
//             <h6>{pet.gender}</h6>
//           </div>
//         </div>
//         <div className="gender-info">
//           <img className="genderinfo" src="/src/assets/paint.png" alt="size" />
//           <img className="semi" src="/src/assets/Semicircular.png" alt="" />
//           <div className="infos">
//             <p className="info-title">color</p>
//             <h6>{pet.size}</h6>
//           </div>
//         </div>
//         <div className="gender-info">
//           <img className="genderinfo" src="/src/assets/Vector.png" alt="Breed" />
//           <img className="semi" src="/src/assets/Semicircular.png" alt="" />
//           <div className="infos">
//             <p className="info-title">Breed</p>
//             <h6>{pet.breeds}</h6>
//           </div>
//         </div>
//         <div className="gender-info">
//           <img className="genderinfo" src="/src/assets/watch_later.png" alt="Age" />
//           <img className="semi" src="/src/assets/Semicircular.png" alt="" />
//           <div className="infos">
//             <p className="info-title">Age</p>
//             <h6>{pet.age}</h6>
//           </div>
//         </div>
//       </div> */}
    
//     <div className="similar-pets">
//         <h2>Similar Pets</h2>
//         <Slider {...sliderSettings}>
//         {/* {similarPets.map((petItem) => ( */}
//           <CardView hostel={hostels} active={''} />
//         {/* ))} */}
//       </Slider>
//       </div>
//   </div>
//   );
// };

// export default PetDetailsRoute;




// import React, { useState } from 'react';
// // import './SimilarPetsSlider.css'; 
// import CardView from './HosCard';
// import './similarHos.css';

// const SimilarPetsSlider = ({ hostels }) => {
// console.log(hostels);
//   return;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const visibleItems = 3; 
//   const handleNext = () => {
//     if (currentIndex < similarPets.length - visibleItems) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="slider-container">
//       {/* <h5>Similar Pets</h5> */}
//       <div className="slider-wrapper">
//         <button className="arrow-btn" onClick={handlePrev} disabled={currentIndex === 0}>
//           &#8249; {/* Left Arrow */}
//         </button>
//         <div className="slider-content">
//           <div
//             className="slider-track"
//             style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
//           >
//             {hostels.slice(currentIndex, currentIndex + visibleItems).map((petItem) => (
//               <div key={petItem.id} className="slider-item">
//                 <CardView hostel={hostels} active={''} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <button className="arrow-btn" onClick={handleNext} disabled={currentIndex >= similarPets.length - visibleItems}>
//           &#8250; {/* Right Arrow */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SimilarPetsSlider;





import React, { useState } from 'react';
import CardView from './HosCard';
import './similarHos.css';

const SimilarPetsSlider = ({ hostels }) => {
  // console.log(hostels);
  // return;
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; // Number of items to show at once

  const handleNext = () => {
    if (currentIndex < hostels.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
      console.log("Next clicked, new index:", currentIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      console.log("Prev clicked, new index:", currentIndex - 1);
    }
  };
  console.log(currentIndex);
const visibleHostels = hostels.slice(currentIndex, currentIndex + visibleItems);
console.log(visibleHostels); // Should print the currently visible hostels

  return (
    <>
      {/* <div>
        <h1>Similar Hostels</h1>
      </div> */}
      <div className="slider-container mt-20 m-auto similar-Hostel">
        <div className="slider-wrapper">
          <p
            className="arrow-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#8249; {/* Left Arrow */}
          </p>
          <div className="slider-content">
            <div
              className="slider-track"
            
            >
              {visibleHostels.map((hostel) => (
                <div key={hostel.id} className="slider-item">
                  <CardView hostel={hostel} />
                </div>
              ))}
            </div>
          </div>
          <p
            className="arrow-btn"
            onClick={handleNext}
            disabled={currentIndex >= hostels.length - visibleItems}
          >
            &#8250; {/* Right Arrow */}
          </p>
        </div>
      </div>
    </>
  );
};

export default SimilarPetsSlider;





