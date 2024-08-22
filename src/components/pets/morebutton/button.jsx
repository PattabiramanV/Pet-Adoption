import { useEffect, useState } from 'react';
import CardView from '../card/card';
import axios from 'axios';
import './button.css';
import Loader from '../../Loader/Loader';

const ViewMore = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchPets = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/petsapi/get_all_pets.php`);
      if (response.data) {
        setPets(response.data.slice(0, 3));
      }
      setLoading(false); 
    } catch (error) {
      console.error('There was an error fetching the pet data!', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <>
      {loading ? (
        <div><Loader /></div> 
      ) : (
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
      )}
    </>
  );
};

export default ViewMore;
