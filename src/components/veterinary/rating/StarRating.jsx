import React from 'react';
import ReactStars from 'react-rating-stars-component';

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  console.log('StarRating rating:', rating); // Verify the rating value

  return (
    <ReactStars
      count={5}
      value={typeof rating === 'number' ? rating : 0} // Ensure rating is a number
      onChange={readOnly ? undefined : onRatingChange}
      size={24}
      activeColor="#ffd700"
      edit={!readOnly}
    />
  );
};

export default StarRating;
