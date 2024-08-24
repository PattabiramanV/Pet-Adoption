import  { useState } from 'react';
import PropTypes from 'prop-types';
import './SimilarPetsSlider.css'; 
import CardView from '../../pets/card/card'; 

const SimilarPetsSlider = ({ similarPets }) => {
  console.log(similarPets);
  // return ;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; 
  const handleNext = () => {
    if (currentIndex < similarPets.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <p className="arrow-btn" onClick={handlePrev} disabled={currentIndex === 0}>
          &#8249; 
        </p>
        <div className="slider-content">
          <div
            className="slider-track"
  
          >
            {similarPets.slice(currentIndex, currentIndex + visibleItems).map((petItem) => (
              <div key={petItem.id} className="slider-item">
                <CardView pets={[petItem]} />
              </div>
            ))}
          </div>
        </div>
        <p className="petsarrow-btn" onClick={handleNext} disabled={currentIndex >= similarPets.length - visibleItems}>
          &#8250; 
        </p>
      </div>
    </div>
  );
};

SimilarPetsSlider.propTypes = {
  similarPets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    
    breed: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
  
  })).isRequired
};

export default SimilarPetsSlider;
