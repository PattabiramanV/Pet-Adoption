// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import './customPage.css';

// Custom arrow components
// const NextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <FaArrowRight
//       className={className}
//       style={{ ...style, display: "block", color: "black" }}
//       onClick={onClick}
//     />
//   );
// };

// const PrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <FaArrowLeft
//       className={className}
//       style={{ ...style, display: "block", color: "black" }}
//       onClick={onClick}
//     />
//   );
// };


// function CustomPaging({ imageUrls }) {

//   const settings = {
//     customPaging: function(i) {
//       return (
//         <a>
//           <img src={imageUrls[i]} alt={`Thumbnail ${i + 1}`} />
//         </a>    
//       );
//     },
//     dots: true,
//     dotsClass: 'slick-dots slick-thumb',
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     // nextArrow: <NextArrow />,  // Adding custom next arrow
//     // prevArrow: <PrevArrow />,  // Adding custom previous arrow
//   };

//   return (
//     <div className="slider-container">
      
//       <Slider {...settings}>
//         {imageUrls.map((url, index) => (
//           <div key={index}>
//             <img src={url} alt={`Slide ${index + 1}`} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

// export default CustomPaging;










import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './customPage.css'

function CustomPaging({ imageUrls }) {
  const settings = {
    customPaging: function(i) {
      return (
        <a className="relative">
          <img src={imageUrls[i]} alt={`Thumbnail ${i + 1}`} className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300 rounded-md hover:border-gray-500 transition-all duration-300" />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <div key={index} className="p-4">
            <img src={url} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
