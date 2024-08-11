
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";

// import imageSrc from "../../../backend/hostel/hostelimg/"
import Loader from '../Loader/Loader'; // Import the Loader component
import { Form, Input, Button, Typography, Divider, message } from "antd";
import './HostelDetail.css';
const HostelDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Loading state
  const [pet, setPet] = useState(null);
  const hosId=location.search.split("=")[1];
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.state && location.state.pet) {
      setPet(location.state.pet);
    } else {
      const fetchPetDetails = async () => {
        try {
          setLoading(true)
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?hosid=${hosId}`
            ,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        //   const data = await response.json();
          console.log("Fetched Pet Data:", response.data); // Debugging output
          setPet(response.data[0]);
        } catch (error) {
          console.error("Failed to fetch pet details:", error);
        }finally{
          setLoading(false);
        }
      };
      fetchPetDetails();
    }
  }, [location.state]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

//   console.log(pet);

//   let imageSrc = `data:image/jpeg;base64,${pet.photo}`;
//   console.log("Image Source:", imageSrc); // Debugging output

  return (
    <>
    
    {loading && <Loader></Loader>}

    <section className="pet-detail-page">

      <div className="pet-detail-container-main">

        <div className="pet-detail-container">

          <div className="pet-images">
            <img src={`../../../backend/hostel/hostelimg/${pet.photos}`} alt={pet.name} className="main-pet-image" />
          </div>

          <div className="pet-details ">

            <div className="div_name">
              <h2 className="pet-name hosName " style={{color:'black',fontSize:'30px'}}>{pet.name}</h2> 
            </div>
            <div className="div_location w-full flex   items-center gap-16">
              
                <strong className=''>Location:</strong> 
                <span className=''> {pet.address}</span>
             
            </div>
            
            <div className=" flex   items-center gap-14">
                 <strong className=''>Price/Day:</strong> 
                 <span className=''>&#8377;{pet.price_per_day}</span>
                  {/* <p><strong>Pet Type:</strong> {pet.pet_type}</p> */}
           
            </div>

            <div className=" flex   items-center gap-16" style={{textTransform:'capitalize'}}>
                <strong className=''>Facilities:</strong> 
                <span>{pet.facilities}</span>
                  {/* <p><strong>Lost Date:</strong> {pet.lost_date}</p> */}
                </div>

                <div className='flex   items-center gap-11 ' >
               <strong className=''>Contact No:</strong>
               <span> {pet.contact}</span>
                </div>
                {/* <p><strong>Address:</strong> {pet.address}</p> */}
            <div className="div_description grid gap-2 " style={{}}>
              <strong className='' style={{fontSize:'24px'}}>Description:</strong>
              <p className="pet-description p-2 tex-xm " style={{lineHeight:'22px',fontSize:'14px',color: 'grey',fontWeight:'500'}}>
               {pet.description}
              </p>
            </div>

            <div className="btn_for_message felx justify-start items-end ">
              <Link to={`/BookHos?id=${hosId}`} className="add-to-cart">Book Now</Link>
              {/* <button className="back-button" onClick={() => navigate("/lostpetlisting")}>
                Go Back
              </button> */}
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default HostelDetails;
