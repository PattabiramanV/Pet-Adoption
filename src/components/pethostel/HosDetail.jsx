
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import "../lostpets/lostlistpet.css";
// import imageSrc from "../../../backend/hostel/hostelimg/"
import Loader from '../Loader/Loader'; // Import the Loader component
import { Form, Input, Button, Typography, Divider, message } from "antd";

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
            `http://localhost/petadoption/backend/api/hostel.php?hosid=${hosId}`
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

          <div className="pet-details grid gap-2">
            <div className="div_name">
              <h2 className="pet-name text-customblue" style={{color:'202020'}}>{pet.name}</h2> 
            </div>
            <div className="div_location">
              <p className="pet-location">
                <i className="fas fa-map-marker-alt"></i><strong>Location:</strong> {pet.address}
              </p>
            </div>
            

            <div className="pet-specifications">
              <div className="pet-card-info">
                <div className="pet_left_de">
                  <p><strong>Price/Day:</strong> &#8377;<span className='text-1xl'>{pet.price_per_day}</span></p>
                  {/* <p><strong>Pet Type:</strong> {pet.pet_type}</p> */}
                </div>
                <div className="pet_right_de">
                  <p><strong>facilities:</strong> {pet.facilities}</p>
                  {/* <p><strong>Lost Date:</strong> {pet.lost_date}</p> */}
                </div>
            </div>
            </div>
                <p><strong>Contact No:</strong> {pet.contact}</p>
                {/* <p><strong>Address:</strong> {pet.address}</p> */}
            <div className="div_description border-l-4 border-customblue" style={{}}>
              <p className="pet-description p-2 tex-xm">
               {pet.description}
              </p>
            </div>
            <div className="btn_for_message felx justify-center">
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
