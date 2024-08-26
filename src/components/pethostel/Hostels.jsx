import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate,Link } from "react-router-dom";
import axios from 'axios';
import Addform from './addhostel/AddPetForHos';
import HostelCard from './HosCard';
import Loader from '../Loader/Loader'; // Import your Loader component

const Hostels = () => {
  const [data, setData] = useState([]);
  const [hostelBookUser, setHostelBookUser] = useState([]);
  const [userType, setUserType] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data);
        // checkUserTypeFun();
        // console.log(JSON.parse(response.data));
        console.log(response.data);
      } catch (error) {
        // setError(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once after the initial render

//   async function checkUserTypeFun(){

//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/profile/read_items.php`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     // setCurrentUser(response.data);
//     setUserType(response.data.user_type);
    
    
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
  
//  }

//  const fetchAllHosBookUser= async()=>{

//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     // setCurrentUser(response.data);
//     console.log(response.data);
//     // setUserType(response.data.user_type);  
//     setHostelBookUser(response.data);
    
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
  

//  }

//  const fetchHosBookbyUser= async()=>{

//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     // setCurrentUser(response.data);
//     console.log(response.data);
//     // setUserType(response.data.user_type);  
//     setHostelBookUser(response.data);
    
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
  

//  }

     

       if(loading) return <Loader></Loader>;
  return (
    <>

      <h1 className="text-3xl text-center mt-5"style={{
  fontSize: '26px',
  color: 'rgba(12, 12, 12, 1)',
  fontWeight: 700,
  textAlign: 'center',
  marginTop: '36px',
  textTransform:'uppercase'
}}
>Book The Best Hostel Service For Your Pet</h1>
      <div className="flex flex-wrap  space-x-4 mt-10 gap-x-2 gap-y-6 pb-8 mx-auto justify-start max-w-[1000px]">
      {/* <HostelCard hostel={data[0]}/>
      <HostelCard hostel={data[1]}/>
      <HostelCard hostel={data[2]}/> */}

     {data?.map((item) => 

      <HostelCard hostel={item} active={"block"} />
      
     )}

      </div>  
     
    </>
  );
}

export default Hostels;
