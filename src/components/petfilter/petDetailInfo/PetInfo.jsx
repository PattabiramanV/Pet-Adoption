import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import Swal from 'sweetalert2';
import axios from 'axios';
import './PetInfo.css';
import { getCode } from 'country-list';
import Loader from '../../Loader/Loader';
import { notification } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomPaging from './InfoSlider';
import SimilarPetsSlider from './similarpets'; 
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb';


const PetDetailsRoute = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [similarPets, setSimilarPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdopted, setIsAdopted] = useState(false);
 const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: 'Home', href: '/' },
    { title: 'Pets', href: '/pets' },
    { title: 'Adopt', href: '/adopte' },
    { title: 'Pet Details', href: `/petDetails/${id}` },
  ]);


  const fetchPetData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_pet_details.php`, {
        params: { id },
        headers: { 'Authorization': `Bearer ${token}` },

      });


      if (response.data.message) {
        console.log(response.data.message);
        
        setError(response.data.message);
        setPet(null);
      } else {
        setPet(response.data.pet);
        setSimilarPets(response.data.similar_pets);
                setIsAdopted(response.data.pet.adopted); 
  console.log(response.data);

        setError(null);
         setBreadcrumbItems((prevItems) => [
          ...prevItems.slice(0, -1), 
          { title: response.data.pet.name, href: `/petDetails/${id}` }, 
        ]);
      }
    } catch (err) {
      setError('Error fetching pet details');
      console.error('Error fetching pet details:', err);
    } finally {
      setLoading(false);
    }
  };


  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setUserProfile(response.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
 


  useEffect(() => {
    fetchPetData();
    fetchUserProfile();
     window.scrollTo(0, 0);
  }, [id]);
  
   
  const handleAdoptNow = async () => {
         if (isAdopted) {
    return; 
  }
    setIsAdopted(true); 
  try {
    const result = await Swal.fire({
      title: 'Do you want to adopt this pet?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
 
   if (!result.isConfirmed) {
      setIsAdopted(false);
      return;
    }

        setIsAdopted(true); 

    if (result.isConfirmed) {
   const addressResult = await Swal.fire({
   title: 'Select Address',
  html: `
    <div class="address-selection">
  <label class="address-option">
    <input type="radio" id="existingAddress" name="addressOption" value="existing">
    <span>Use existing address</span>
  </label>
  <div id="existingAddressDisplay" class="address-display">
   <div class="addressdisplay">
    <p>${userProfile.address}, <br>
    <span>
     ${userProfile.city}, ${userProfile.state}</p>
    </span>
   </div>
   
   
  </div>
  
  <label class="address-option">
    <input type="radio" id="newAddressOption" name="addressOption" value="new">
    <span>Provide new address</span>
  </label>
  <div id="newAddressFields" class="address-fields">
    <input type="text" id="newAddress" class="swal2-input" placeholder="Address" required>
    <input type="text" id="newState" class="swal2-input" placeholder="State" required>
    <input type="text" id="newCity" class="swal2-input" placeholder="City" required>
  </div>
</div>
`,
  showCancelButton: true,
  preConfirm: () => {
    const addressOption = document.querySelector('input[name="addressOption"]:checked').value;

    if (addressOption === 'new') {
      const newAddress = document.getElementById('newAddress').value;
      const newState = document.getElementById('newState').value;
      const newCity = document.getElementById('newCity').value;

      if (!newAddress || !newState || !newCity) {
        Swal.showValidationMessage('Please fill out all required fields.');
        return false;
      }

      return {
        address: newAddress,
        state: newState,
        city: newCity,
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
    const existingAddressDisplay = document.getElementById('existingAddressDisplay');

    existingAddressRadio.addEventListener('change', () => {
      if (existingAddressRadio.checked) {
        existingAddressDisplay.style.display = 'block';
        newAddressFields.style.display = 'none';
      }
    });

    newAddressRadio.addEventListener('change', () => {
      if (newAddressRadio.checked) {
        newAddressFields.style.display = 'block';
        existingAddressDisplay.style.display = 'none';
      }
    });
  }
});

  if (!addressResult.isConfirmed) {
        setIsAdopted(false); 
        return;
      }

  const addressData = addressResult.value;
  console.log(addressData);

  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire('Error', 'No token found for authorization.', 'error');
      setIsAdopted(false); 
    return;
  }

  try {
     setLoading(true); 
    const ownerResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/pet_owner.php`, {
      params: { id: pet.user_id },
    });
    const userEmail = ownerResponse.data.email;

    const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/read_profile.php`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const userProfile = profileResponse.data;

    const emailResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/send_email.php`,
      new URLSearchParams({
        email: userEmail,
        userName: userProfile.username,
        userContact: userProfile.phone,
        gender: userProfile.gender,
        city: addressData.city || userProfile.city,
        state: addressData.state || userProfile.state,
        address: addressData.address || userProfile.address
      })
    );

    if (emailResponse.data.success) {
        setLoading(false);
      notification.success({
        message: 'Request successfully sent to the owner',
        description: 'The owner will review your request. Please be patient.',
      });

      try {
        const updateResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/petsapi/adopt_pet.php`,
          new URLSearchParams({
            id: pet.id,
            user_id: userProfile.id,
            address: addressData.address || '',
            state: addressData.state || '',
            city: addressData.city || '',
            status: 'pending'
          })
        );

        if (updateResponse.data.success) {
          setPet({ ...pet });
        } else {
          Swal.fire('Error', 'There was an issue updating the adoption status.', 'error');
        }
      } catch (error) {
        console.error('Error updating adoption status:', error);
        Swal.fire('Error', 'There was an issue updating the adoption status.', 'error');
          setIsAdopted(false); 
      }
    } else {
      Swal.fire('Error', emailResponse.data.message || 'There was an issue sending the email.', 'error');
        setIsAdopted(false); 
    }
  } catch (error) {
    console.error('Error fetching pet owner profile:', error);
    Swal.fire('Error', 'There was an issue fetching the pet owner profile.', 'error');
      setIsAdopted(false); 
  }
}
  } catch (error) {
    console.error('Error in adoption process:', error);
    Swal.fire('Error', 'There was an issue with the adoption process.', 'error');
      setIsAdopted(false); 
  }
};

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!pet) return null;

  const countryCode = getCode(pet.state);
console.log(pet);
const parsed=JSON.parse(pet.photo);
console.log(parsed);

const baseUrl = '/backend/petsapi/hostelimg/'; 
  const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);
console.log(imageUrls);
const image1 = imageUrls[0];
console.log(image1);





  return (
    <>

          <BreadcrumbComponent items={breadcrumbItems}  />

    <div className="pet-info-page">
     <div className="pet-image-name-info ">
      <div className="pet-image-info ">
  <img src={`${image1}`} alt="Pet" />
</div>

        <div className="pet-image-name">
          <h3 className="pet-details-name">{pet.name}</h3>
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
        <div className="Infos">
          <CustomPaging  imageUrls={imageUrls} />
        </div>
        <div className="info-description">
          <h3>{pet.name} Story</h3>
          <p>{pet.description}</p>

          <div className="healthDetails ">
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
            <p>Price: <span>₹{Number(pet.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            </div>
            <div className=" adoptNow">
            <button className="adopte" onClick={handleAdoptNow} disabled={isAdopted}>
         {isAdopted ? ' Adopted' : 'Adopt Now'}
        </button>
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
    
    <div className="similar-pets">
        <h2>Similar Pets</h2>
            <SimilarPetsSlider similarPets={similarPets} />

      </div>
  </div>
      
    </>
  );
};

export default PetDetailsRoute;






























