// import React from 'react';
// import './reviewCard.css';
// import StarRating from './StarRating'; // Make sure this path is correct

// const ReviewSection = () => {
//   // Example review data
//   const reviews = [
//     {
//       avatar: '10.jpg',
//       user_name: 'Olivia Wilson',
//       rating: 4,
//       comments: "Amazing service! I can't wait to come back, love your products."
//     },
//     {
//       avatar: '10.jpg',
//       user_name: 'John Doe',
//       rating: 5,
//       comments: "Excellent experience. Highly recommended!"
//     },
//     {
//       avatar: '10.jpg',
//       user_name: 'Jane Smith',
//       rating: 3,
//       comments: "Good service, but there's room for improvement."
//     }
//   ];

//   return (
//     <div className="review-section">
//       <h1>Our Clients</h1>
//       {reviews.length > 0 ? (
//         reviews.map((review, index) => (
//           <div key={index} className="review-card">
//             <img 
//               src={`../../../../backend/profile/uploads/${review.avatar}`} 
//               alt="Client Photo" 
//               className="profile-img" 
//             />
//             <div className="review-content">
//               <div className="name">{review.user_name}</div>
//               <StarRating rating={review.rating} readOnly={true} />  
//               <p>{review.comments}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default ReviewSection;



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
