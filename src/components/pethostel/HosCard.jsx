// // import hostelImage from "../../assets/dog_hostel_img.jpg"; // Corrected: added ".jpg" file extension
// import { useNavigate } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { IoLocationOutline } from "react-icons/io5";
// import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
// import { HeartFilled } from "@ant-design/icons";

// function HostelCard({ hostel, active }) {
//   // console.log(props);
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     navigate(`/hosdetailpage?id=${hostel.id}`);
//   };

//   return (

    
//     <a
//       className="p-4 max-w-sm border border-indigo-300 rounded-md hover:shadow-xl hover:shadow-indigo-50 flex flex-col  gap-1"
//       href="#"
//       style={{width:'320px',height:"430px"}}
//     >
//       <div  style={{height:"200px"}}>
//       <img
//         src={`../../../backend/hostel/hostelimg/${hostel.photos}`}
//         className="h-30 shadow rounded-lg overflow-hidden border"
//         alt="Hostel"
//         style={{height:"100%"}}
//       />
//       </div>
// <div>
//       <h3 className="text-2xl text-customPurple ">{hostel?.name}</h3>
//       <div className="flex items-center gap-1">
//         {/* <h4 className="font-bold text-xl">Location:</h4> */}
//         <p>
//           <IoLocationOutline />
//         </p>
//         <p className="text-gray-600 text-customBlue text-xs">
//           {hostel?.address}
//         </p>
//       </div>
//       <div className="mt-3 flex gap-4 items-center">
//         <div className="w-1/4  flex items-center justify-between gap-1">
//           <h4 className="font-bold text-xl">Since:</h4>
//           <p className="text-gray-600 text-xs mt-1 text-customBlue">1980</p>
//         </div>

//         <div className=" w-3/4  flex items-center gap-1 justify-end">
//           <h4 className="font-bold text-xl">Contact:</h4>
//           <p className="text-gray-600 text-xs mt-1 text-customBlue">
//             {hostel?.contact}
//           </p>
//         </div>
//       </div>

//       <div>
//         <p className="mt-2 text-gray-600 text-sm">
//           Create Exercises for any subject with the topics you and your students
//           care about...
//         </p>
//       </div>
//       </div>

//       {/* <div className="w-90 mt-5 flex justify-center w-full"> */}
//       <button
//   type="button"
//   onClick={handleButtonClick}
//   className="w-full px-5 py-2.5 border rounded cursor-pointer text-center mt-2.5 text-sm border-[#675bc8] bg-white text-[#675bc8] hover:bg-[#675bc8] hover:text-white"
// >
//   View More
// </button>

//         {/* <button
//           type="button"
//           className={`w-1/2 max-w-40 ${active} border border-customPurple rounded-md font-medium text-lightPurpule text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
//         >
//           Message
//         </button> */}
//       {/* </div> */}
//     </a>
//   );
// }

// export default HostelCard;
















// import hostelImage from "../../assets/dog_hostel_img.jpg"; // Corrected: added ".jpg" file extension
import { useNavigate,Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { IoLocationOutline } from "react-icons/io5";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { HeartFilled } from "@ant-design/icons";
import './hostelCard.css'
function HostelCard({ hostel, active }) {
  console.log(hostel);
  const navigate = useNavigate();

  

  return (

    
   
<div className="Hostelcard-container  ">
<div className="hoscardimg">
  <img
    src={`../../../backend/hostel/hostelimg/${hostel.photos}`}
    className="img"
    alt={name}
  />
</div>
  
  <div className="commonData">
  <div className="locationdescript">
 
  <div className="datas">
     <div className="namelocation">
    <h3 className="name">{hostel.name}</h3>
   <h3 className="loca">
    <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker"/>
    <span>{hostel.address}</span>
  </h3>
  </div>

  <div className="middleData">

    <div className="">
      
    <div className="phoneTime">

      <div className="phone">
       <p>Phone: </p>
       <span>{hostel.contact}</span>
      </div>
          <div className="time">
                  <p className="">Price/Day:</p>
                  <span className="">&#8377;{hostel.price_per_day}</span>

      </div>
    </div>
     
    </div>
    {/* <div className="detail2">
    <div className="ages">
                <p>Age: <span id="age">{hostel.price_per_day }</span></p>

    </div>
    <div className="sizes">
                <p>Size: <span className="rightSide">{hostel.id}</span></p>

    </div>
    </div> */}
  </div>
  </div>
  
  <div className="des">
          <p className="description">{hostel.description.slice(0, 70)}...</p>

  </div>
  </div>
  <div className="hosbuttons-card">
  <Link to={`/pethostel/details/${hostel.id}`} className="mores">More Info</Link>
</div>

  </div>
</div>
  );
}

export default HostelCard;





