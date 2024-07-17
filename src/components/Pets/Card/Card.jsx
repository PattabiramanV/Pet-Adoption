import PropTypes from 'prop-types';
import './Card.css';

let userData = [
  {
    "name": "Buddy",
    "city": "San Francisco",
    "description": "Buddy is a playful and friendly Labrador Retriever who loves to play fetch and enjoys being around people. He's well-trained, great with kids, and ready to find his forever home.",
    "breed": "Lab",
    available: true,
    "age":2,
          "size":"Large",

        "gender":"boy",
    "profile": "/src/assets/dog1.jpg",

  },
  {
    "name": "Luna",
    "city": "New York",
    "description": "Luna is a gentle and loving Siamese cat who enjoys lounging in the sun and getting lots of attention. She's spayed, up-to-date on her shots, and looking for a loving family.",
    "breed": "GSD",
    "gender":"boy",
        "age":2,
      "size":"Large",
    available: false,
    "profile": "/src/assets/cat1.jpg"
  },
  {
    "name": "Max",
    "city": "Los Angeles",
    "description": "Max is an energetic Beagle with a keen sense of smell. He loves going on walks and exploring new places. Max is house-trained and great with other dogs.",
    "breed": "Pug",
    available: false,
        "age":2,
             "size":"Large",

        "gender":"boy",
    "profile": "/src/assets/dog2.jpg"
  },
  // {
  //   "name": "Bella",
  //   "city": "Chicago",
  //   "description": "Bella is a sweet and affectionate Persian cat. She enjoys being brushed and cuddled. Bella is declawed and prefers a quiet home without young children.",
  //   "breed": "Persian",
  //   "available": true,
  //   "profile": "/src/assets/cat2.jpg"
  // },
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
function PetDetails(props) {
  return (
    <div className="container">
      <div className="card-container">
        <img src={props.profile} className="img" alt="" />
        <h3 className="name">{props.name}</h3>
        <h3 className="loca">
          <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker"/>    
          <span>{props.city}</span>
        </h3> 
        <div className="details">
          <div className="detail1">
            <p>Gender: <span>{props.gender}</span></p>
         
               <p>Breed: <span>{props.breed}</span></p>
          </div>
          <div className="detail2">
             <p>Age: <span className="age">{props.age}</span></p>
            <p>Size: <span>{props.size}</span></p>
          </div>
        </div>
        <p className="description">{props.description.slice(0, 55)}...</p>
        <div className="buttons-card">
          <button className="more"><a href='petDetails'>More info</a></button>
        </div>
      </div>
    </div>
  );
}

const CardView = () => {
  return (
    <>
      {userData.map((user, index) => (
        <PetDetails 
          key={index}
          name={user.name}
          city={user.city}
          description={user.description}
          available={user.available}
          profile={user.profile}
          breed={user.breed}
          gender={user.gender}
          age={user.age}
          size={user.size}
        />
      ))}
    </>
  );
};

export default CardView;

PetDetails.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  available: PropTypes.bool,
  profile: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  breed:PropTypes.string.isRequired,
  gender:PropTypes.string.isRequired,
  age:PropTypes.number.isRequired,
  size:PropTypes.string.isRequired
};


