import React, { useState } from 'react';
import './SimilarPetsSlider.css'; 
import CardView from '../../pets/card/card'; 

const SimilarPetsSlider = ({ similarPets }) => {
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
      {/* <h5>Similar Pets</h5> */}
      <div className="slider-wrapper">
        <button className="arrow-btn" onClick={handlePrev} disabled={currentIndex === 0}>
          &#8249; {/* Left Arrow */}
        </button>
        <div className="slider-content">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {similarPets.slice(currentIndex, currentIndex + visibleItems).map((petItem) => (
              <div key={petItem.id} className="slider-item">
                <CardView pets={[petItem]} />
              </div>
            ))}
          </div>
        </div>
        <button className="arrow-btn" onClick={handleNext} disabled={currentIndex >= similarPets.length - visibleItems}>
          &#8250; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default SimilarPetsSlider;
