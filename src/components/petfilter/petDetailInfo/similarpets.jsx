import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SimilarPetsSlider.css';
import CardView from '../../pets/card/card';

const SimilarPetsSlider = ({ similarPets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3;

  const adjustedIndex = currentIndex % (similarPets.length - visibleItems + 1);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % similarPets.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + similarPets.length) % similarPets.length
    );
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      handleNext();
    }, 3000); 
    return () => clearInterval(autoSlideInterval);
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <button 
          className="arrow-btn prev-btn" 
          onClick={handlePrev} 
          aria-label="Previous"
        >
          &#8249;
        </button>
        <div className="slider-content">
          <div className="slider-track">
            {similarPets.slice(adjustedIndex, adjustedIndex + visibleItems).map((petItem) => (
              <div key={petItem.id} className="slider-item">
                <CardView pets={[petItem]} />
              </div>
            ))}
          </div>
        </div>
        <button 
          className="arrow-btn next-btn" 
          onClick={handleNext} 
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
