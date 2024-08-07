import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import Swal from 'sweetalert2';
import axios from 'axios';
import './PetInfo.css';
import { getCode } from 'country-list';
import Loader from '../../Loader/Loader';

const PetDetailsRoute = () => {
 const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await axios.get(`http://localhost/petadoption/backend/pets_api/get_pet_details.php`, {
          params: { id },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.message) {
          setError(response.data.message);
          setPet(null);
        } else {
          setPet(response.data);
          setError(null);
        }
      } catch (error) {
        setError('Error fetching pet details');
        console.error('Error fetching pet details:', error);
      }
    };

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost/petadoption/backend/profile/read_profile.php", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchPet();
    fetchUserProfile();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pet) {
    return <Loader />;
  }

  const countryCode = getCode(pet.state);
const handleAdoptNow = async () => {
  const result = await Swal.fire({
    title: 'Do you want to adopt this pet?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  });

  if (result.isConfirmed) {
    const addressResult = await Swal.fire({
      title: 'Select Address',
      html:
        `<input type="radio" id="existingAddress" name="addressOption" value="existing" checked>
         <label for="existingAddress">Use existing address (${userProfile.address}, ${userProfile.city}, ${userProfile.state})</label><br>
         <input type="radio" id="newAddressOption" name="addressOption" value="new">
         <label for="newAddressOption">Provide new address</label><br>
         <div id="newAddressFields" style="display:none;">
           <input type="text" id="newAddress" class="swal2-input" placeholder="Address">
           <input type="text" id="newState" class="swal2-input" placeholder="State">
           <input type="text" id="newCity" class="swal2-input" placeholder="City">
         </div>`,
      showCancelButton: true,
      preConfirm: () => {
        const addressOption = document.querySelector('input[name="addressOption"]:checked').value;
        if (addressOption === 'new') {
          return {
            address: document.getElementById('newAddress').value,
            state: document.getElementById('newState').value,
            city: document.getElementById('newCity').value,
          };
        }
        return {
          address: userProfile.address,
          state: userProfile.state,
          city: userProfile.city,
        };
      },
      didOpen: () => {
        const existingAddressRadio = document.getElementById('existingAddress');
        const newAddressRadio = document.getElementById('newAddressOption');
        const newAddressFields = document.getElementById('newAddressFields');

        existingAddressRadio.addEventListener('change', () => {
          if (existingAddressRadio.checked) {
            newAddressFields.style.display = 'none';
          }
        });

        newAddressRadio.addEventListener('change', () => {
          if (newAddressRadio.checked) {
            newAddressFields.style.display = 'block';
          }
        });
      }
    });

    if (!result.isConfirmed) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error', 'No token found for authorization.', 'error');
      return;
    }

    try {
      const ownerResponse = await axios.get("http://localhost/petadoption/backend/pets_api/pet_owner.php", {
        params: { id: pet.user_id },
      });
      const userEmail = ownerResponse.data.email;

      const profileResponse = await axios.get("http://localhost/petadoption/backend/profile/read_profile.php", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const userProfile = profileResponse.data;

      let addressData = addressResult.value;

      const emailResponse = await axios.post('http://localhost/petadoption/backend/pets_api/send_email.php',
        new URLSearchParams({
          email: userEmail,
          userName: userProfile.username,
          userContact: userProfile.phone,
          gender: userProfile.gender,
          city: addressData.city || userProfile.city,
          state: addressData.state || userProfile.state,
          address: addressData.address || userProfile.address
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (emailResponse.data.success) {
        Swal.fire('Adoption process started', 'Your pet adoption process has started.', 'success');

        try {
          const updateResponse = await axios.post('http://localhost/petadoption/backend/pets_api/adopt_pet.php',
            new URLSearchParams({
              id: pet.id,
              user_id: userProfile.id,  
              address: addressData.address || '',
              state: addressData.state || '',
              city: addressData.city || '',
               status: 'pending'
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          if (updateResponse.data.success) {
            setPet({ ...pet});
          } else {
            Swal.fire('Error', 'There was an issue updating the adoption status.', 'error');
          }
        } catch (error) {
          console.error('Error updating adoption status:', error);
          Swal.fire('Error', 'There was an issue updating the adoption status.', 'error');
        }
      } else {
        Swal.fire('Error', 'There was an issue sending the email.', 'error');
      }
    } catch (error) {
      console.error('Error fetching pet owner profile:', error);
      Swal.fire('Error', 'There was an issue fetching the pet owner profile.', 'error');
    }
  }
};




  return (
    <div className="pet-info-page">
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
              <img className="healthImg" src="/src/assets/child_care.png" alt="Child Care" />
              <span>Can live with other children of any age</span>
            </div>
            <div className="vacc-info health">
              <img className="healthImg" src="/src/assets/vaccines.png" alt="Vaccines" />
              <span>Vaccinated</span>
            </div>
            <div className="house-info health">
              <img className="healthImg" src="/src/assets/warehouse.png" alt="House-Trained" />
              <span>House-Trained</span>
            </div>
            <div className="price-info health">
              <p>Price: <span>${pet.price}</span></p>
            </div>
            <div className="buttons adoptNow">
              <button className="adopt" onClick={handleAdoptNow}>Adopt {pet.pet_name}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="petPerson">
        <div className="gender-info">
          <img className="genderinfo" src="/src/assets/female.png" alt="Gender" />
          <img className="semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">Gender</p>
            <h6>{pet.gender}</h6>
          </div>
        </div>
        <div className="gender-info">
          <img className="genderinfo" src="/src/assets/paint.png" alt="size" />
          <img className="semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">color</p>
            <h6>{pet.size}</h6>
          </div>
        </div>
        <div className="gender-info">
          <img className="genderinfo" src="/src/assets/Vector.png" alt="Breed" />
          <img className="semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">Breed</p>
            <h6>{pet.breeds}</h6>
          </div>
        </div>
        <div className="gender-info">
          <img className="genderinfo" src="/src/assets/watch_later.png" alt="Age" />
          <img className="semi" src="/src/assets/Semicircular.png" alt="" />
          <div className="infos">
            <p className="info-title">Age</p>
            <h6>{pet.age}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsRoute;
