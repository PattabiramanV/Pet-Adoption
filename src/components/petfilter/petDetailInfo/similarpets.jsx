import { useState } from 'react';
import PropTypes from 'prop-types';
import './SimilarPetsSlider.css';
import CardView from '../../pets/card/card';

const SimilarPetsSlider = ({ similarPets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3;
  
  const isNextDisabled = currentIndex >= similarPets.length - visibleItems;
  const isPrevDisabled = currentIndex <= 0;

  const handleNext = () => {
    if (!isNextDisabled) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isPrevDisabled) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <button 
          className="arrow-btn prev-btn" 
          onClick={handlePrev} 
          disabled={isPrevDisabled}
          aria-label="Previous"
        >
          &#8249;
        </button>
        <div className="slider-content">
          <div className="slider-track">
            {similarPets.slice(currentIndex, currentIndex + visibleItems).map((petItem) => (
              <div key={petItem.id} className="slider-item">
                <CardView pets={[petItem]} />
              </div>
            ))}
          </div>
        </div>
        <button 
          className="arrow-btn next-btn" 
          onClick={handleNext} 
          disabled={isNextDisabled}
          aria-label="Next"
        >
          &#8250;
        </button>
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
  })).isRequired,
};

export default SimilarPetsSlider;
