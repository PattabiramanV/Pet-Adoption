import React from 'react';
import ReactStars from 'react-rating-stars-component';

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      onChange={readOnly ? undefined : onRatingChange} // Disable onChange if readOnly
      size={24}
      activeColor="#ffd700"
      edit={!readOnly} // If readOnly, disable editing
    />
  );
};

export default StarRating;
