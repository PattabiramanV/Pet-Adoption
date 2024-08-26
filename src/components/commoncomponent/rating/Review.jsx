

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom';
import './review.css';
import StarRating from './StarRating'; // Ensure you have this component

const MySwal = withReactContent(Swal);

const ReviewForm = ({ onSubmit }) => {
  const handleReviewSubmit = async () => {
    let currentRating = 0;

    const { value: formValues } = await MySwal.fire({
      title: 'Submit Your Review',
      html: `
       <div class='grid gap-6'>
        <div id="star-rating" style="display: flex; justify-content: center; "></div>
        <textarea id="review-text" class="swal2-input" placeholder="Write your review here..." style="height: 100px;"></textarea>
      </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Submit Review',
      showCancelButton: true,
      didOpen: () => {
        ReactDOM.render(
          <StarRating 
            rating={currentRating} 
            onRatingChange={(newRating) => currentRating = newRating} 
            readOnly={false}
          />,
          document.getElementById('star-rating')
        );
      },
      preConfirm: () => {
        const reviewText = document.getElementById('review-text').value;
        return {
          reviewText,
          rating: currentRating
        };
      }
    });

    if (formValues) {
      const { reviewText, rating } = formValues;
      if (reviewText && rating > 0) {
        onSubmit({ review: reviewText, rating });
        // Swal.fire(`Thank you for your review: "${reviewText}" with ${rating} stars`);
      } else {
        Swal.fire('Please provide a review and a rating');
      }
    }
  };

  return (
    <a onClick={handleReviewSubmit} className="cursor-pointer">
      Add Review
    </a>
  );
};

export default ReviewForm;
