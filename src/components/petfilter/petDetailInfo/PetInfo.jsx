import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import Swal from 'sweetalert2';
import './PetInfo.css';
import { getCode } from 'country-list';

const PetDetailsRoute = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost/petadoption/Backend/api/get_pet_details.php?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.message) {
          setError(data.message);
          setPet(null);
        } else {
          setPet(data);
          setError(null);
        }
      } catch (error) {
        setError('Error fetching pet details');
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPet();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pet) {
    return <div>Loading...</div>;
  }

  const countryCode = getCode(pet.state);

  const handleAdoptNow = () => {
    Swal.fire({
      title: 'Do you want to adopt this pet?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Adoption process started', 'Your pet adoption process has started.', 'success');
      }
    });
  };

  return (
    <div className="pet-info-page">
      <div className="welcome-user">
        <h2>Hi human!</h2>
      </div>
      <div className="pet-image-name-info">
        <div className="pet-image-info">
          {pet.photo ? (
            <img src={`data:image/jpeg;base64,${pet.photo}`} className="pet-details-img" alt={pet.pet_name} />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div className="pet-image-name">
          <h3 className="pet-details-name">{pet.pet_name}</h3>
          <div className="maps">
            <div className="flag">
              {countryCode && <ReactCountryFlag countryCode={countryCode} svg className='map' />}
            </div>
            <h3 className="loca-info">
              <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker" />
              <span>{pet.city}</span> 
            </h3>
          </div>
        </div>    
      </div>
      <div className="slider-content">
        <div className="slider-info">
          {pet.photo ? (
            <img src={`data:image/jpeg;base64,${pet.photo}`} className="slider-img" alt={pet.pet_name} />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div className="info-description">
          <h3>{pet.pet_name} Story</h3>
          <p>{pet.description}</p>  

          <div className="healthDetails">
            <div className="live health">
              <img className="healthImg" src="/src/assets/child_care.png" alt="" /> <span>Can live with other children of any age</span>
            </div>
            <div className="vacc-info health">
              <img className="healthImg" src="/src/assets/vaccines.png" alt="" /> <span>Vaccinated</span>
            </div>
            <div className="house-info health">
              <img className="healthImg" src="/src/assets/warehouse.png" alt="" /> <span>House-Trained</span>
            </div>
            <div className="price-info health">
              <p>Price: <span>${pet.price}</span></p>
            </div>
            <div className="buttons adoptNow">
              <button className="adopt" onClick={handleAdoptNow}>Adopt now</button>
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
            <h6>{pet.gender}</h6>
          </div>
        </div>
        <div className="breed-info">
          <img className="breedinfo" src="/src/assets/Vector.png" alt="" />
          <img className="semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">Breed</p>
            <h6>{pet.breeds}</h6>
          </div>
        </div>
        <div className="age-info">
          <img className="ageinfo" src="/src/assets/watch_later.png" alt="" />
          <img className="semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">Age</p>
            <h6>{pet.age}</h6>
          </div>
        </div>
        <div className="color-info">
          <img className="colorinfo" src="/src/assets/paint.png" alt="" />
          <img className="Imgsize semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">Color</p>
            <h6>{pet.color}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

PetDetailsRoute.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  available: PropTypes.bool,
  profile: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  breeds: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired, // Added price prop
};

export default PetDetailsRoute;