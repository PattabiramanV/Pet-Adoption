import { useEffect, useState } from 'react';
import CardView from '../card/card';
import axios from 'axios';
import './button.css';

const ViewMore = () => {
  const [pets, setPets] = useState([]); 

  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost/petadoption/backend/petsapi/get_all_pets.php');
      if (response.data) {
        setPets(response.data.slice(0, 3)); 
      }
    } catch (error) {
      console.error('There was an error fetching the pet data!', error); 
  }
  };

  useEffect(() => {
    fetchPets(); 
  }, []);

  return (
    <>
      <div className="threeCard">
      <div className="overlapcard">
        <CardView pets={pets} /> 
      </div>
      </div>
      <div className="Rehome">
        <div className="mores-info">
          <button className="mores">
            <a href="petList">See more</a> 
          </button>
        </div>
      </div>
    </>
  );
}


export default ViewMore;
