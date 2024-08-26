import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './card.css';
import { notification } from 'antd';

function PetDetails({ id, name, city, description = 'No description available', profile, breed, gender, age, size }) {
  let image1 = '';
  console.log(profile);

  if (profile) {
    try {

      const parsed = JSON.parse(profile);

      const baseUrl = '/backend/petsapi/hostelimg/';
      const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);
      image1 = imageUrls[0] || image1;
    } catch (error) {
      notification.error({
        message: `Error parsing profile photos: ${error}`,
      });

    }
  }

  return (
    <div className="petscard-container">
      <div className="petscardimg">
        <img
          src={image1}
          className="petsimg"
          alt={name}
        />
      </div>
      <div className="petscommonData">
        <div className="petslocationdescript">
          <div className="petsdatas">
            <div className="petsnamelocation">
              <h3 className="petsname">{name}</h3>
              <h3 className="petsloca">
                <img className="petslocation" src="/src/assets/location_on.png" alt="marker" />
                <span>{city}</span>
              </h3>
            </div>
            <div className="petsdetails">
              <div className="petsdetail1">
                <div className="petsBreedsname">
                  <div className="petsgenders">
                    <p>Gender: <span>{gender}</span></p>
                  </div>
                  <div className="petsbreed">
                    <p className="petsbreeds">Breed: <span className="petsright">{breed}</span></p>
                  </div>
                </div>
              </div>
              <div className="petsdetail2">
                <div className="petsages">
                  <p>Age: <span id="petsage">{age}</span></p>
                </div>
                <div className="petssizes">
                  <p>Size: <span className="petsrightSide">{size}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="petsdes">
            <p className="petsdescription">{description.slice(0, 73)}..</p>
          </div>
        </div>
        <div className="petsbuttons-card">
          <Link to={`/petDetails/${id}`} className="petsmores" >More info</Link>
        </div>
      </div>
    </div>
  );
}

PetDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  description: PropTypes.string,
  breed: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string.isRequired
};

PetDetails.defaultProps = {
  description: 'No description available'
};

const CardView = ({ pets }) => {




  if (!Array.isArray(pets)) {
    return <p>No pets available.</p>;
  }

  return (
    <div className="petscontainer">
      {pets.map(pet => (
        <PetDetails
          key={pet.id}
          id={pet.id}
          name={pet.name}
          city={pet.city}
          description={pet.description}
          profile={pet?.photo}
          breed={pet.breeds}
          gender={pet.gender}
          age={pet.age}
          size={pet.size}
          demo={pet}
        />
      ))}
    </div>
  );
};

CardView.propTypes = {
  pets: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CardView;
