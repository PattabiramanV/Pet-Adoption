// import React from 'react';
// import { useNavigate } from "react-router-dom";
// import './location.css';

// function LocationforPets() {
//     const navigate = useNavigate();

//     const handleNavigation = () => {
//       navigate('/petdetails', { state: { pet } });
//     };
//     return (
//         <div className="app">
//             <header className="header">
//                 <div className="logo"> {/* Your logo here */} </div>
//                 <div className="search-bar">
//                     <select className="location-select">
//                         <option value="Los Angeles">Los Angeles</option>
//                         {/* Add more options here */}
//                     </select>
//                     <input type="text" placeholder="Search..." className="search-input" />
//                 </div>
//                 <div className="user-profile">
//                     <span className="contact-number">+1 (800) 657 8976</span>
//                     <div className="profile-icon"> {/* User icon here */} </div>
//                 </div>
//             </header>
//             <div className='allcontainer'>
//             <div className='content_cantainer'>
//             <div className="content">
//                  <button className="filter-btn" >Hostel</button> 
//                     <button className="filter-btn" onClick={handleNavigation}>Vetnarians</button>
//                     <button className="filter-btn">Adoption</button>
//             </div>

//                 <div className="main">
//                     <h2>Current Location in Pets</h2>
//                     <div className="listing">
//                         <img src="" alt="Fully Furnished Smart Studio Apartment" className="listing-img" />
//                         <div className="listing-details">
//                             <h3>Fully Furnished Smart Studio Apartment</h3>
//                             <p>2 guests | 1 bedroom | 2 bathrooms</p>
//                             <p>Entire Studio Apartment</p>
//                         </div>
//                     </div>

//                     <div className="listing">
//                         <img src="path/to/image2.jpg" alt="Furnished Apartment" className="listing-img" />
//                         <div className="listing-details">
//                             <h3>Furnished Apartment</h3>
//                             <p>4 guests | 3 bedrooms | 2 bathrooms</p>
//                             <p>Entire home</p>
//                         </div>
//                     </div>

//                     <div className="listing">
//                         <img src="path/to/image3.jpg" alt="Classic Studio Apartment" className="listing-img" />
//                         <div className="listing-details">
//                             <h3>Classic Studio Apartment</h3>
//                             <p>3 guests | 1 bedroom | 1 bathroom</p>
//                             <p>Entire Studio Apartment</p>
//                         </div>
//                     </div>

//                     {/* Add more listings as needed */}
//                 </div>
//                 </div>

//                 <div className="map">
//                     {/* Integrate a map using a library like Leaflet or Google Maps */}
//                 </div>
//                 </div>
//             </div>
//     );
// }

// export default LocationforPets;
