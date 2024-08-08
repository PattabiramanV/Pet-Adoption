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
          'http://localhost/petadoption/backend/api/hostel.php',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data);
        checkUserTypeFun();
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

  async function checkUserTypeFun(){

  try {
    const response = await axios.get(
      `http://localhost/petadoption/backend/profile/read_items.php`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // setCurrentUser(response.data);
    setUserType(response.data.user_type);
    
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  
 }

 const fetchAllHosBookUser= async()=>{

  try {
    const response = await axios.get(
      `http://localhost/petadoption/backend/api/hostelbook.php?endpoint=hostel_user`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // setCurrentUser(response.data);
    console.log(response.data);
    // setUserType(response.data.user_type);  
    setHostelBookUser(response.data);
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  

 }

 const fetchHosBookbyUser= async()=>{

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // setCurrentUser(response.data);
    console.log(response.data);
    // setUserType(response.data.user_type);  
    setHostelBookUser(response.data);
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  

 }

      const addHostelFun=()=>{

     
    
       }

       if(loading) return <Loader></Loader>;
  return (
    <>
  
      {/* {userType=='hostel_user' ? (
        <div>
        <button
        onClick={fetchAllHosBookUser}
          type="button"
          className="w-1/2 max-w-40 border border-customPurple rounded-md text-lightPurpule font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
         View Hos Details
        </button>
            </div>
      ) : 
      null

      } */}
      
       {/* <button
      onClick={fetchHosBookbyUser}
          type="button"
          className="w-1/2 max-w-40 border border-customPurple rounded-md text-lightPurpule font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
         View your details 
        </button> */}


        {/* <div className="">
        {hostelBookUser?.map((item) => 

<div>
<p>{item.username}</p>
<p>{item.name}</p>
</div>
   

)}
  </div> */}

        
<div  style={{ width: '90%',margin:"0 auto",marginTop:"10px" }}  className="mt-4 flex justify-end " >
      <Link
        to="/addhostel"
        onClick={addHostelFun}
        type="button"
        className="px-5 py-2.5 rounded-md cursor-pointer text-center w-40 mt-2 text-base border border-[#675bc8] bg-white text-[#675bc8] hover:bg-[#675bc8] hover:text-white"

     >

        Add Hostel
      </Link>
    </div>

      

      <h1 className="text-3xl text-center mt-5">Book The Best Hostel Service For Your Pet</h1>
      <div className="flex flex-wrap justify-center space-x-4 mt-16 gap-x-2 gap-y-6">
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
