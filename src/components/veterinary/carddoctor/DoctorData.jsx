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
  // {
  //   "Doctorname": "Buddy",
  //     "education":"Mbs",
  //     "clinic":"YES",
  //     "experience": "4 years",
  //     "specialisation":"surgery",
  //     "address": "89 d,L block,anna nager east, chennai.",
  //     "contactno":95678345526,
  //    " HomeVisitingAvailable":"YES",
  //     // available: true,
  //     "profile": "/src/assets/profilepic.png",
  //     "description":"hi hello i am Buddy i am veterinary docter"
  //   },
  // {
  //   "name": "Charlie",
  //   "city": "Houston",
  //   "description": "Charlie is a lovable Golden Retriever who is great with children and other pets. He is well-mannered and loves to play fetch. Charlie is looking for an active family to join.",
  //   "breed": "Golden Retriever",
  //   "available": true,
  //   "profile": "/src/assets/dog3.jpg"
  // },
  // {
  //   "name": "Molly",
  //   "city": "Phoenix",
  //   "description": "Molly is a charming Shih Tzu who loves to be pampered. She is hypoallergenic and perfect for families with allergies. Molly enjoys short walks and lots of cuddles.",
  //   "breed": "Shih Tzu",
  //   "available": true,
  //   "profile": "/src/assets/cat3.jpg"
  // },
  // {
  //   "name": "Rocky",
  //   "city": "Philadelphia",
  //   "description": "Rocky is a strong and playful Boxer. He has a lot of energy and loves to run and play. Rocky is best suited for an active owner who can keep up with his energy levels.",
  //   "breed": "Boxer",
  //   "available": true,
  //   "profile": "/src/assets/dog4.jpg"
  // },
  // {
  //   "name": "Daisy",
  //   "city": "San Antonio",
  //   "description": "Daisy is a friendly and sociable Poodle. She is highly intelligent and easy to train. Daisy enjoys playing with toys and is great with other dogs and children.",
  //   "breed": "Poodle",
  //   "available": true,
  //   "profile": "/src/assets/cat4.jpg"
  // },
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


