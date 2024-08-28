



import React, { useState } from 'react';
import CardView from './HosCard';
import './similarHos.css';

const SimilarPetsSlider = ({ hostels }) => {
  // console.log(hostels);
  // return;
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; // Number of items to show at once

  const handleNext = () => {
    if (currentIndex < hostels.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
      console.log("Next clicked, new index:", currentIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      console.log("Prev clicked, new index:", currentIndex - 1);
    }
  };
  console.log(currentIndex);
const visibleHostels = hostels.slice(currentIndex, currentIndex + visibleItems);
console.log(visibleHostels); // Should print the currently visible hostels

  return (
    <>
      {/* <div>
        <h1>Similar Hostels</h1>
      </div> */}
      <div className="slider-container mt-20 m-auto similar-Hostel">
        <div className="slider-wrapper">
          <p
            className="arrow-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#8249; {/* Left Arrow */}
          </p>
          <div className="slider-content">
            <div
              className="slider-track"
            
            >
              {visibleHostels.map((hostel) => (
                <div key={hostel.id} className="slider-item">
                  <CardView hostel={hostel} />
                </div>
              ))}
            </div>
          </div>
          <p
            className="arrow-btn"
            onClick={handleNext}
            disabled={currentIndex >= hostels.length - visibleItems}
          >
            &#8250; {/* Right Arrow */}
          </p>
        </div>
      </div>
    </>
  );
};

export default SimilarPetsSlider;





