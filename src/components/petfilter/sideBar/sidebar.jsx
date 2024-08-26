import  { useState, useEffect } from 'react';
import axios from 'axios';
import CardView from '../../pets/card/card';
import './sideBar.css';
import { notification, Pagination } from 'antd';
import Loader from '../../Loader/Loader';


const PetForm = () => {
  const [petTypes] = useState(['cat', 'dog']);
  const [sizes] = useState(['Small', 'Medium', 'Large']);
  const [breeds, setBreeds] = useState([]);
  const [ages, setAges] = useState([]);
  const [colors] = useState(['Brown', 'Black', 'White']);
  const [genders] = useState(['Male', 'Female']);
  
  const [formData, setFormData] = useState({
    petType: '',
    searchLocation: '',
    size: '',
    breed: '',
    age: '',
    color: '',
    gender: ''
  });
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
    const [filteredPets, setFilteredPets] = useState([]);
  const petsPerPage = 9;
    const fetchInitialData = async () => {

      try {
        const [petResponse, filterOptionsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_all_pets.php`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_filter_options.php`)
        ]);
        console.log(petResponse.data);
        console.log(filterOptionsResponse.data);
        

        setPets(petResponse.data);
        setFilteredPets(petResponse.data);
        setAges(Array.isArray(filterOptionsResponse.data.ages) ? filterOptionsResponse.data.ages : []);
        setBreeds(Array.isArray(filterOptionsResponse.data.breeds) ? filterOptionsResponse.data.breeds : []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to fetch initial data.');
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    filterPets();
  }, [formData]);

const handleChange = (e) => {
  const { name, value } = e.target;
  
  const trimmedValue = value.trim();
  
  setFormData(prevData => ({
    ...prevData,
    [name]: trimmedValue,
  }));
};



  const filterPets = async () => {
  try {
    const sanitizedFormData = { ...formData, searchLocation: formData.searchLocation.trim() };

    const queryParams = new URLSearchParams(sanitizedFormData).toString();
    
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/filter_search.php?${queryParams}`);
    
    if (response.status === 200) {
      const result = response.data;
      if (result.status === 'success') {
        setPets(result.data);
        setFilteredPets(result.data);
        setError('');
      } else {
        setPets([]);
        setFilteredPets([]);
        setError('No matching pets found.');
        notification.warning({
          message: 'No Pets Found',
          description: 'No pets match your search criteria. Please try different filters.',
        });
      }
    } else {
      throw new Error('API response not successful');
    }
  } catch (error) {
    console.error('Error occurred while fetching pets:', error);
    setPets([]);
    setFilteredPets([]);
    setError('An error occurred while fetching pets. Please try again later.');
    notification.error({
      message: 'Error',
      description: 'An error occurred while fetching pets. Please try again later.',
    });
  }
};


  let handleReset = (e) => {
    e.preventDefault();
    let isFormFilled = Object.values(formData).some(value => value !== '');

    if (isFormFilled) {
      setFormData({
        petType: '',
        searchLocation: '',
        size: '',
        breed: '',
        age: '',
        color: '',
        gender: ''
      });
      setCurrentPage(1);
      setFilteredPets();    
      
         notification.success({
        message: 'Filters Reset',
        description: 'All filters have been cleared. Please select new options to search again.',
      })
    }else{
      notification.error({
        message: 'No Filters Applied',
        description: 'There are no filters to reset. Please fill in some filters before resetting.',
      })
    }
  };

   console.log(pets);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const shuffledPets = shuffleArray([...pets]);  
console.log(pets);

  const currentPets = shuffledPets.slice(indexOfFirstPet, indexOfLastPet);
console.log(currentPets);

  return (
    <div className="petsfilter-filterpet">
      <div className="petsfilterSearch">
        <form className="petspet-form" >
         <label>
            Search Location:
            <input
              type="text"
              name="searchLocation"
              value={formData.searchLocation}
              onChange={handleChange}
            />
          </label>
          <label>
            Pet Type:
            <select name="petType" className="petsselect" value={formData.petType} onChange={handleChange}>
              <option value="">Select Pet Type</option>
              {petTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
         
          <label>
            Size:
            <select name="size" className="petsselect" value={formData.size} onChange={handleChange}>
              <option value="">Select Size</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          <label>
            Breed:
            <select name="breed" className="petsselect" value={formData.breed} onChange={handleChange}>
              <option value="">Select Breed</option>
              {breeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </label>
          <label>
            Age:
            <select name="age"  className="petsselect" value={formData.age} onChange={handleChange}>
              <option value="">Select Age</option>
              {ages.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </label>
          <label>
            Color:
            <select name="color" className="petsselect" value={formData.color} onChange={handleChange}>
              <option value="">Select Color</option>
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </label>
          <label>
            Gender:
            <select name="gender" className="petsselect" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </label>
          <div className="resetfilter petsbuttons-card">
            <button className='petsmore rfilter' onClick={handleReset}>Reset Filter</button>
          </div>
        </form>
      </div>
    <div className="petspet-details_card">
        <div className="petspets_details">
          {loading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <div className="petsno-pets-container">
                  <img src="/src/assets/queryimage.png" alt="No pets available" className="petsno-pets-image" />
                </div>
              )}
              <CardView pets={currentPets} />
              {pets.length > petsPerPage && (
                <Pagination
                  className="pagination"
                  current={currentPage}
                  pageSize={petsPerPage}
                  total={pets.length}
                  onChange={(page) => setCurrentPage(page)}
                />
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default PetForm;
