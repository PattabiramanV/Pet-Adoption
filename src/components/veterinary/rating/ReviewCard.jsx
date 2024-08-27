

import React from 'react';
import './reviewCard.css';
import StarRating from './StarRating';

const ReviewCard = ({ pet }) => {
  console.log(pet);
  // return;

  return (
    <div className="review-card shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <img
        src={`../../../../backend/profile/uploads/${pet?.avatar}`}
        alt="Client Photo"
        className="profile-img rounded-full w-16 h-16 object-cover mb-4"
      />
      <div className="review-content">
        <div className="name font-semibold text-gray-700 mb-2">{pet?.user_name}</div>
        <StarRating rating={pet?.user_rating} readOnly={true} />
        <p className="text-gray-600 mt-2">{pet?.comments}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
