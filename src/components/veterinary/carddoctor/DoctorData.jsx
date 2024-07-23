import PropTypes from "prop-types";
import './doctorPage.css';

let userData = [
  {
    "Doctorname": "Buddy",
    "education":"Mbs",
    "clinic":"YES",
    "experience": "4 years",
    "specialisation":"surgery",
    "address": "89 d,L block,anna nager east, chennai.",
    "contactno":95678345526,
   " HomeVisitingAvailable":"YES",
    // available: true,
    "profile": "/src/assets/profilepic.png",
    "description":"hi hello i am Buddy i am veterinary docter"
  },
  {"Doctorname": "Buddy",
    "education":"Mbs",
    "clinic":"YES",
    "experience": "4 years",
    "specialisation":"surgery",
    "address": "89 d,L block,anna nager east, chennai .",
    "contactno":95678345526,
   " HomeVisitingAvailable":"YES",
    // available: true,
    "profile": "/src/assets/profilepic.png",
    "description":"hi hello i am Buddy i am veterinary docter"
  },
  {
  "Doctorname": "Buddy",
    "education":"Mbs",
    "clinic":"YES",
    "experience": "4 years",
    "specialisation":"surgery",
    "address": "89 d,L block,anna nager east, chennai.",
    "contactno":95678345526,
   " HomeVisitingAvailable":"YES",
    // available: true,
    "profile": "/src/assets/profilepic.png",
    "description":"hi hello i am Buddy i am veterinary docter"
  },
  
];
function DoctorDetails(props) {
  
  return (
  
    <div className="doctorContainer">
    <div className="Doccard-container">
      <img src={props.profile} className="doctorImg" alt="Doctor Picture" />
      <h3 className="docname">{props.Doctorname}</h3>
      <div className="Docdetails">
        <h3 className="doctorcontact"><span>Contact No:</span> {props.contactno}</h3>
        <p className="address"><span>Address:</span> {props.address}</p>
      </div>
      <div className="buttons-card">
        <button className="morebutton">More info</button>
      </div>
    </div>
  </div>
  
   
  );
}

const DoctorCard = () => {
  return (
    <>
      {userData.map((user, index) => (
        <DoctorDetails 
          key={index}
          Doctorname={user.Doctorname}
          education={user.education}
          description={user.description}
          clinic={user.clinic}
          profile={user.profile}
          contactno={user.contactno}
          specialisation={user.specialisation}
          HomeVisitingAvailable={user.HomeVisitingAvailable}
          experience={user.experience}
          address={user.address}
        />
      ))}
    </>
  );
};

export default DoctorCard;

// DoctorDetails.propTypes = {
//   name: PropTypes.string.isRequired,
//   city: PropTypes.string.isRequired,
//   available: PropTypes.bool,
//   profile: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   breed:PropTypes.string.isRequired,
//   gender:PropTypes.string.isRequired,
//   age:PropTypes.number.isRequired,
//   size:PropTypes.string.isRequired
// };


// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

// import React, { useEffect, useState } from "react";
// import './doctorPage.css';

// const DoctorDetails = (props) => {
//   return (
//     <div className="doctorContainer">
//       <div className="Doccard-container">
//         <img src={props.profile} className="doctorImg" alt="Doctor Picture" />
//         <h3 className="docname">{props.Doctorname}</h3>
//         <div className="Docdetails">
//           <h3 className="doctorcontact"><span>Contact No:</span> {props.contactno}</h3>
//           <p className="address"><span>Address:</span> {props.address}</p>
//         </div>
//         <div className="buttons-card">
//           <button className="morebutton">More info</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const DoctorCard = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     fetch('http://localhost/Pet-Adoption/Backend/api/retriveVetrinaryDocinfo.php')
//       .then(response => response.json())
//       .then(data => {
//         console.log('API response:', data); // Debugging statement
//         if (Array.isArray(data)) {
//           setUserData(data);
//         } else {
//           console.error('API response is not an array:', data);
//         }
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <>
//       {Array.isArray(userData) && userData.length > 0 ? (
//         userData.map((user, index) => (
//           <DoctorDetails 
//             key={index}
//             Doctorname={user.name}
//             education={user.education}
//             description={user.description}
//             clinic={user.have_a_clinic}
//             profile={user.profile_img}
//             contactno={user.phone}
//             specialisation={user.specialist}
//             HomeVisitingAvailable={user.home_visiting_available}
//             experience={user.experience}
//             address={user.address}
//           />
//         ))
//       ) : (
//         <p>No doctors available.</p>
//       )}
//     </>
//   );
// };

// export default DoctorCard;
