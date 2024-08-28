






import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './customPage.css';

function CustomPaging({ imageUrls }) {
  const settings = {
    customPaging: function(i) {
      return (
        <a className="relative">
          <img src={imageUrls[i]} alt={`Thumbnail ${i + 1}`} className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300 hover:border-gray-500 transition-all duration-300" />
        </a>
      );
    },
    dots: imageUrls.length > 1, // Show dots only if more than one image
    dotsClass: 'slick-dots slick-thumb',
    infinite: imageUrls.length > 1, // Infinite scroll only if more than one image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <div key={index} className="p-4 slider-image-container">
            <img src={url} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;

