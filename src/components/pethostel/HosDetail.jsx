
// import axios from 'axios';
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate,Link,useParams, json } from "react-router-dom";

// // import imageSrc from "../../../backend/hostel/hostelimg/"
// import Loader from '../Loader/Loader'; // Import the Loader component
// import { Form, Input, Button, Typography, Divider, message } from "antd";
// import './HostelDetail.css';
// import CustomPaging from './CustomPaging';

// const HostelDetails = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false); // Loading state
//   const [pet, setPet] = useState(null);

//   const hosId = useParams().id;
//   console.log(hosId);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (location.state && location.state.pet) {
//       setPet(location.state.pet);
//     } else {
//       const fetchPetDetails = async () => {
//         try {
//           setLoading(true)
//           const response = await axios.get(
//             `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?hosid=${hosId}`
//             ,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//         //   const data = await response.json();
//           console.log("Fetched Pet Data:", response.data); // Debugging output
//           setPet(response.data[0]);
//         } catch (error) {
//           console.error("Failed to fetch pet details:", error);
//         }finally{
//           setLoading(false);
//         }
//       };
//       fetchPetDetails();
//     }
//   }, [location.state]);

//   // console.log(JSON.parse(pet.photos));
//   if (!pet) {
//     return <Loader></Loader>;
//   }
//   const parsed = JSON.parse(pet.photos);
// // const datt=json
//   console.log(parsed);

// //   let imageSrc = `data:image/jpeg;base64,${pet.photo}`;
// //   console.log("Image Source:", imageSrc); // Debugging output
// // const imageUrls = [
// //     `${baseUrl}/abstract01.jpg`,
// //     `${baseUrl}/abstract02.jpg`,
// //     `${baseUrl}/abstract03.jpg`,
// //     `${baseUrl}/abstract04.jpg`
// //   ];
// const baseUrl = '../../../backend/hostel/hostelimg/2/'; // Base URL where images are stored
// const numImages =parsed.length; // Number of images based on pet photos array

// // Generate image URLs dynamically using pet.photos array if it contains filenames
// const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);

// // If you need to generate a sequence of image names (e.g., abstract01.jpg), use this:
// const imageUrlss = Array.from({ length: numImages }, (_, index) => `${baseUrl}abstract0${index + 1}.jpg`);
// console.log(im);
//   return (
//     <>
    
//     {loading && <Loader></Loader>}

//     <section className="pet-detail-page">

//       <div className="pet-detail-container-main">

//         <div className="pet-detail-container">

//           <div className="pet-images">
//             {/* <img src={`../../../backend/hostel/hostelimg/2/${parsed[0]}`} alt={pet.name} className="main-pet-image" /> */}
//             <CustomPaging imageUrls={imageUrlss} /> 
//           </div>

//           <div className="hosright-details ">

//             <div className="div_name">
//               <h2 className="pet-name hosName " style={{color:'black',fontSize:'30px'}}>{pet.name}</h2> 
//             </div>
//             <div className="div_location w-full flex   items-center gap-16">
              
//                 <strong className=''>Location:</strong> 
//                 <span className=''> {pet.address}</span>
             
//             </div>
            
//             <div className=" flex   items-center gap-14">
//                  <strong className=''>Price/Day:</strong> 
//                  <span className=''>&#8377;{pet.price_per_day}</span>
//                   {/* <p><strong>Pet Type:</strong> {pet.pet_type}</p> */}
           
//             </div>

//             <div className=" flex   items-center gap-16" style={{textTransform:'capitalize'}}>
//                 <strong className=''>Facilities:</strong> 
//                 <span>{pet.facilities}</span>
//                   {/* <p><strong>Lost Date:</strong> {pet.lost_date}</p> */}
//                 </div>

//                 <div className='flex   items-center gap-11 ' >
//                <strong className=''>Contact No:</strong>
//                <span> {pet.contact}</span>
//                 </div>
//                 {/* <p><strong>Address:</strong> {pet.address}</p> */}
//             <div className="hos_description  " style={{}}>
//               <strong className='' style={{fontSize:'24px'}}>Description:</strong>
//               <p className="pet-description p-2 tex-xm " style={{lineHeight:'22px',fontSize:'14px',color: 'grey',fontWeight:'500'}}>
//                {pet.description}
//               </p>
//             </div>

//             <div className="btn_for_message felx justify-start items-end ">
//               <Link to={`/pethostel/booking/${hosId}`} className="add-to-cart">Book Now</Link>
//               {/* <button className="back-button" onClick={() => navigate("/lostpetlisting")}>
//                 Go Back
//               </button> */}
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//     </>
//   );
// };

// export default HostelDetails;










import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams,Link } from "react-router-dom";
import Loader from '../Loader/Loader'; // Import the Loader component
import CustomPaging from '../commoncomponent/custompage/CustomPaging';
import './HostelDetail.css';
import ReviewForm from '../commoncomponent/rating/Review';
import { notification } from 'antd';
import  StarRating from  '../commoncomponent/rating/StarRating';
import ReviewCard from '../commoncomponent/rating/ReviewCard'
import Tabs from '../commoncomponent/tabs/Tabs';
import NewTab from '../commoncomponent/tabs/NewTab'
import SimilarHos from './SimilarHos';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
const HostelDetails = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Corrected useLocation() hook usage
  const [loading, setLoading] = useState(false); // Loading state
  const [pet, setPet] = useState(null);
  const hosId = useParams().id;
  const token = localStorage.getItem('token');
  const [reviews, setReviews] = useState(null);
  const [hostels, setHostels] = useState(null);
  // console.log(hosId==40);
  const [rating, setRating] = useState(null); 
  const [userId, setUserId] = useState(null); 
console.log('hosId',hosId);


  const fetchPetDetails = async () => {
    try {
     
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?hosid=${hosId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log(response.data);
  
      if (response.data.status == 'success') {
     console.log('res',response);

        setPet(response?.data?.reviewData[0]);
      
      setReviews(response?.data?.reviewData);
      setHostels(response?.data?.hostels);
      setUserId(response?.data?.user_id);
      console.log('find',Math.floor(response?.data?.reviewData[0]?.average_rating));
      setRating(Math.floor(response?.data?.reviewData[0]?.average_rating));
      // setRating(Math.floor(Number(pet?.average_rating)));

        }

     else{
      notification.error({
        message: 'Error',
        description: response.data.message || 'An unexpected error occurred.',
      });
     }

    } catch (error) {
      notification.error({
        message: 'Submission Failed',
        description: response.data.message || 'An unexpected error occurred.',
      });
      console.error("Failed to fetch pet details:", error);
      
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // if (location.state && location.state.pet) {
    //   setPet(location.state.pet);
    // } else {
    
    // }
console.log('hosId',hosId);

  fetchPetDetails();
  window.scrollTo(0, 0);

  }, [hosId]);

// console.log(rat);
console.log('rating',typeof rating);
  // console.log(pet);
  // console.log(reviews);
  // if (loading) {
  //   return <Loader />;
  // }


  // Parse the image filenames from the pet object
  let parsed = [];
  try {
    parsed = JSON.parse(pet.photos) || [];
  } catch (error) {
    console.error("Failed to parse pet photos:", error);
  }

  const baseUrl = `../../../backend/hostel/hostelimg/`; // Adjust base URL if necessary
  const imageUrls = parsed.map(photo => `${baseUrl}${photo}`);
console.log(imageUrls);


// Example function for handling review submission
const handleReviewSubmit = async (reviewData) => {

  try {
    const token = localStorage.getItem('token');
    
    // Prepare the data for submission
    const data = {
      ...reviewData,
      hostel_id: hosId // Assuming you have a hostel ID to send
    };

    // Make the API request
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php`, // Adjust the URL as needed
      JSON.stringify(data),
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        
        }
      }
    );
    
 
    if (response.data.status == 'success') {
      console.log(response.data);
      notification.success({
        message: 'Review Submitted Successfully!',
        description: response.data.message || 'Your review has been submitted.',
      });
  fetchPetDetails();
 

      // You can also clear the form or navigate as needed
      // e.g., setReviewData({ review: '', rating: 0 });
    } else {
      // Show error notification
      notification.error({
        message: 'Submission Failed',
        description: response.data.message || 'An unexpected error occurred.',
      });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    notification.error({
      message: 'Error Submitting Review',
      description: error.response?.data.message || error.message || 'There was an error submitting the review.',
    });
  }
};


console.log(pet);
console.log(hostels);

  return (
    <>
    {loading && <Loader></Loader>}
      {/* <div className="btn_for_message flex justify-end items-end p-2 ">
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>   */}
    <section className="pet-detail-page flex ">
      <div className="pet-detail-container-main">
        <div className="pet-detail-container">
          <div className="pet-images">
            <div>
            <h2 className="pet-name hosName" style={{ color: 'black', fontSize: '30px', padding:'16px',textTransform:'capitalize'}}>
                {pet?.hostel_name}
              </h2>


            </div>
           
            <CustomPaging imageUrls={imageUrls} /> {/* Pass image URLs as props */}
          </div>

          <div className="hosright-details">  
  <div className="w-full grid gap-3">
    
    <div className="div_name flex items-center gap-6">
      <div style={{width:'130px'}}>
        {rating || rating === 0 ? (
          <StarRating rating={rating} readOnly={true} />
        ) : null}
      </div>
      <ReviewForm onSubmit={handleReviewSubmit} />
    </div>

    <div className="info-row flex items-center gap-3 min-h-12">
      <strong className="info-label">Location</strong>
      <main>:</main>
      <span className="info-content">{pet?.hostel_address}</span>
    </div>

    <div className="info-row flex items-center gap-3">
      <strong className="info-label">Price/Day</strong>
      <main>:</main>
      <span className="info-content bg-gray-100 rounded-md flex items-center space-x-1 text-customblue text-sm" style={{ padding: '6px' }}>
        <span className="text-2xl text-customblue font-semibold">&#8377;</span>
        <span className="font-bold text-customblue" style={{ fontSize: '14px' }}>{pet?.price_per_day}</span>
        <span className="ml-1 text-xs text-gray-800 font-semibold">/day</span>
      </span>
    </div>

    <div className="info-row flex items-center gap-3" style={{ textTransform: 'capitalize' }}>
      <strong className="info-label">Facilities</strong>
      <main>:</main>
      <span className="info-content">{pet?.facilities}</span>
    </div>

    <div className="info-row flex items-center gap-3">
      <strong className="info-label">Contact No</strong>
      <main>:</main>
      <span className="info-content">{pet?.contact}</span>
    </div>

    <div className="info-row flex items-center gap-3">
      <strong className="info-label">Available time</strong>
      <main>:</main>
      <span className="info-content" style={{ textTransform: 'uppercase' }}>{pet?.available_time}</span>
    </div>

  </div>

  <div className="w-full flex" style={{ position: 'relative', bottom: '-52px' }}>
    <div className="btn_for_message">
      <a href={`tel:${pet?.contact}`} className="add-to-cart">Contact Owner</a>
    </div>
    <div className="hosBookNowBtn btn_for_message">
      <Link to={`/pethostel/booking/${hosId}`} className="add-to-cart">Book Now</Link>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>

{/* <ReviewCard></ReviewCard> */}
{/* {reviews && (

<Tabs hostelReviews={reviews}   />

)} */}

<div>
{reviews && (

<NewTab hostelReviews={reviews} ></NewTab>

)}

</div>
<div className='mb-20'>
{pet && (

<SimilarHos hostels={hostels}  />

)}
</div>


    </>
  );
};

export default HostelDetails;
