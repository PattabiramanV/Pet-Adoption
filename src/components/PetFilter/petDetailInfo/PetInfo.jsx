import './PetInfo.css';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import SimpleSlider from './InfoSlider';

let userData = [
  {
    "name": "Buddy",
    "city": "Chennai",
    "description": "Buddy is a playful and friendly Labrador Retriever who loves to play fetch and enjoys being around people. He's well-trained, great with kids, and ready to find his forever home.",
    "breed": "Lab",
    "available": true,
    "age": 2,
    "location": "India", 
    'color':'red',
    "size": "Large",
    "gender": "boy",
    "profile": "/src/assets/dog1.jpg",
  },
];

const countryNameToCode = {
  "India": "IN",
  "United States": "US",
  "Canada": "CA",
  // Add other country name mappings as needed
};

function PetDetailsRoute(props) {
  const getCountryCode = (countryName) => {
    return countryNameToCode[countryName] || ""; 
  };

  const countryCode = getCountryCode(props.location);

  return (
    <div className="pet-info-page">
      <div className="welcome-user">
        <h2>Hi human!</h2>
      </div>
      <div className="pet-image-name-info">
        <div className="pet-image-info">
          <img src={props.profile} className="pet-details-img" alt={props.name} />
        </div>
        <div className="pet-image-name">
          <h3 className="pet-details-name">{props.name}</h3>
          <div className="maps">
            <div className="flag">
            {countryCode && (
              <ReactCountryFlag countryCode={countryCode} svg className='map' />
            )}
          </div>
          <h3 className="loca-info">
            <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker" />
            <span>{props.city}</span> 
          </h3>
          </div>
        </div>    
      </div>
        <div className="slider-content">
          <div className="slider-info">
             <SimpleSlider />
           </div>
            <div className="info-description">
              <h3>{props.name} Story</h3> 
              <p>{props.description}</p>  

              <div className="healthDetails">
                <div className="live health">
                  <img  className="healthImg " src="/src/assets/child_care.png" alt="" /> <span>Can live with other children of any age</span>
                </div>
                <div className="vacc-info health">
                  <img className="healthImg" src="/src/assets/vaccines.png" alt="" /> <span>Vaccinated</span>
                </div>
                <div className="house-info health">
                  <img className="healthImg" src="/src/assets/warehouse.png" alt="" /> <span>House-Trained</span>
                </div>
                  <div className="buttons adoptNow">
                  <a href="/adopte">
                    <button className="adopt">Adopt now</button>
                  </a>
                  </div>
                </div>
             </div>
              
        </div>
        <div className="petPerson">
  <div className="gender-info">
    <img className="genderinfo" src="/src/assets/female.png" alt="" />
    <img className="semi" src="/src/assets/Semicircular.png" alt="" />
    <div className="infos">
      <p className="info-title">Gender</p>
      <h6>{props.gender}</h6>
    </div>
  </div>
  <div className="breed-info">
    <img className="breedinfo" src="/src/assets/Vector.png" alt="" />
    <img className="semi" src="/src/assets/Semicircular.png" alt="" />
    <div className="infos">
      <p className="info-title">Breed</p>
      <h6>{props.breed}</h6>
    </div>
  </div>
  <div className="age-info">
    <img className="ageinfo" src="/src/assets/watch_later.png" alt="" />
    <img className="semi" src="/src/assets/Semicircular.png" alt="" />
    <div className="infos">
      <p className="info-title">Age</p>
      <h6>{props.age}</h6>
    </div>
  </div>
  <div className="color-info">
    <img className="colorinfo" src="/src/assets/paint.png" alt="" />
    <img className="Imgsize semi" src="/src/assets/Semicircular.png" alt="" />
    <div className="infos">
      <p className="info-title">Color</p>
      <h6>{props.color}</h6>
    </div>
  </div>
</div>

    </div>
  );
}

const CardView = () => {
  return (
    <>
      {userData.map((user, index) => (
        <PetDetailsRoute
          key={index}
          name={user.name}
          city={user.city}
          color={user.color}
          location={user.location}
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

PetDetailsRoute.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  available: PropTypes.bool,
  profile: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  color:PropTypes.string.isRequired,
};

export default CardView;
