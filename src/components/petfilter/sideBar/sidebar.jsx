import { useState, useEffect } from 'react';
import axios from 'axios';
import CardView from '../../pets/card/card';
import './sideBar.css';

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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [petResponse, filterOptionsResponse] = await Promise.all([
          axios.get('http://localhost/petadoption/backend/pets_api/get_all_pets.php'),
          axios.get('http://localhost/petadoption/backend/pets_api/get_filter_options.php')
        ]);

        setPets(Array.isArray(petResponse.data) ? petResponse.data : []);
        setAges(Array.isArray(filterOptionsResponse.data.ages) ? filterOptionsResponse.data.ages : []);
        setBreeds(Array.isArray(filterOptionsResponse.data.breeds) ? filterOptionsResponse.data.breeds : []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to fetch initial data.');
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    filterPets();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filterPets = async () => {
    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await axios.get(`http://localhost/petadoption/backend/pets_api/filter_search.php?${queryParams}`);
      const result = response.data;

      if (result.status === 'success') {
        setPets(result.data.length > 0 ? result.data : []);
        setError('');
      } else {
        setPets([]);
        const noMatchFilters = result.noMatchFilters;
        let errorMessage = 'No matching pets found.';

        if (Object.keys(noMatchFilters).length > 0) {
          errorMessage += ' Filters with no matching pets: ' + Object.keys(noMatchFilters).join(', ');
        }

        setError(errorMessage);
      }
    } catch (error) {
      setPets([]);
      setError('Pet not available');
    }
  };

  return (
    <div className="filter-filterpet">
      <div className="filterSearch">
        <form className="pet-form">
          <label>
            Pet Type:
            <select name="petType" value={formData.petType} onChange={handleChange}>
              <option value="">Select Pet Type</option>
              {petTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
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
            Size:
            <select name="size" value={formData.size} onChange={handleChange}>
              <option value="">Select Size</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          <label>
            Breed:
            <select name="breed" value={formData.breed} onChange={handleChange}>
              <option value="">Select Breed</option>
              {breeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </label>
          <label>
            Age:
            <select name="age" value={formData.age} onChange={handleChange}>
              <option value="">Select Age</option>
              {ages.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </label>
          <label>
            Color:
            <select name="color" value={formData.color} onChange={handleChange}>
              <option value="">Select Color</option>
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </label>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <div className="pet-details">
        {error && <p className="error-message">{error}</p>}
        <CardView pets={pets} />
      </div>
    </div>
  );
};

export default PetForm;
