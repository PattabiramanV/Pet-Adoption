















// import hostelImage from "../../assets/dog_hostel_img.jpg"; // Corrected: added ".jpg" file extension
import { useNavigate,Link } from "react-router-dom";

import { IoLocationOutline } from "react-icons/io5";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { HeartFilled, JavaScriptOutlined } from "@ant-design/icons";
import './hostelCard.css'
import { useState,useEffect } from "react";
function HostelCard({ hostel, active }) {
  // console.log(hostel);
  const navigate = useNavigate();
const [images, setImages] = useState([]);
const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImage = '../../../backend/hostel/hostelimg/cat3.jpg'; // Set the path to your default image



     
   

useEffect(() => {
  // Normalize the photos data
  let imageArray = [];
  try {
    if (typeof hostel.photos === 'string') {
      const parsed = JSON.parse(hostel.photos);
      if (Array.isArray(parsed)) {
        imageArray = parsed;
      } else {
        imageArray[0] = [hostel.photos];
      }
    } else if (Array.isArray(hostel.photos)) {
      imageArray = hostel.photos;
    }
  } catch (error) {
    console.error('Error parsing photos:', error);
  }
  setImages(imageArray);
}, [hostel.photos]);
console.log(images);


  return (

    
   
<div className="Hostelcard-container pethostelCard ">
<div className="hoscardimg">
      <img
        src={imageLoaded ? `../../../backend/hostel/hostelimg/${images[0]}` : defaultImage}
        className="img"
        alt="Hostel"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)} // In case of error, revert to default image
      />
    </div>
  
  <div className="commonData">
  <div className="locationdescript">
 
  <div className="datas">
     <div className="namelocation">
    <h3 className="name">{hostel.name}</h3>
   <h3 className="loca">
    <img className="location" src="https://img.icons8.com/material-outlined/24/000000/marker.png" alt="marker"/>
    <span>{hostel.address.slice(0, 70)}</span>  
  </h3>
  </div>

  <div className="middleData">

    <div className="">
      
    <div className="phoneTime">

      <div className="phone">
       <p>Time: </p>
       <span>{hostel.available_time}</span>
      </div>
          <div className="time">
                  <p className="">Price/Day:</p>
                  <span className="">&#8377;{hostel.price_per_day}</span>

      </div>
    </div>
     
    </div>
  
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





