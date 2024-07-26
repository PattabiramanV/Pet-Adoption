import { useState, useEffect } from 'react';
import axios from 'axios';
import CardView from '../../pets/card/card';
import './sideBar.css';

const PetForm = () => {
  const [petTypes] = useState(['cat', 'dog']);
  const [sizes] = useState(['Small', 'Medium', 'Large']);
  const [breeds] = useState(['pug', 'golden', 'lab', 'rottie']);
  const [ages] = useState([2, 3, 4, 5, 7, 8, 9]);
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
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost/petadoption/Backend/api/get_all_pets.php');
        setPets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching pet data:', error);
        setError('Failed to fetch initial pet data.');
      }
    };

    fetchPets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();

    try {
      const response = await axios.get(`http://localhost/petadoption/Backend/api/filter_search.php?${queryParams}`);
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setError('No matching pets found.');
        } else {
          setPets(response.data);
          setError('');
        }
      } else {
        setPets([]);
        setError('No matching pets found.');
      }
    } catch (error) {
      console.error('Error fetching pet data:', error);
      setError('Failed to fetch pet data.');
    }
  };

  return (
    <div className="filter-filterpet">
      <div className="filterSearch">
        <form className="pet-form" onSubmit={handleSubmit}>
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
          <button type="submit" className='more'>Search</button>
        </form>
      </div>
      <div className="list-pet">
        {error && <p className="error-message">{error}</p>}
        <CardView pets={pets} />
      </div>
    </div>
  );
};

export default PetForm;
