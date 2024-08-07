import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import DataTable from "../components/commoncomponent/DataTable";
import text from "../assets/Cat_login.png";
import Loader from '../components/Loader/Loader'; // Import the Loader component
import { Form, Input, Button, Typography, Divider, message } from "antd";
import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary

const Hosteldetails = () => {
  const [hostelBookUser, setHostelBookUser] = useState(null);
  const token = localStorage.getItem("token"); // Replace with your actual token
  const [loading, setLoading] = useState(false); 

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=normal_user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHostelBookUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {

  fetchUserData();

   
  }, []); // Empty dependency array means this effect runs once when the component mounts
  
  const columns = [
    {
        title: 'Profile',
        dataIndex: 'photos',
        key: 'photos',
        render: (text) => <img src={`../../backend/hostel/hostelimg/${text}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
    },
    {
        title: 'Hostel',
        dataIndex: 'name',
        key: 'name'
    },
    // {
    //     title: 'City',
    //     dataIndex: 'doctor_city',
    //     key: 'doctor_city'
    // },
    // {
    //     title: 'State',
    //     dataIndex: 'doctor_state',
    //     key: 'doctor_state'
    // },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Phone',
        dataIndex: 'contact',
        key: 'contact'
    },
    // {
    //     title: 'Email',
    //     dataIndex: 'doctor_email',
    //     key: 'doctor_email'
    // },
    {
        title: 'Price/Day',
        dataIndex: 'price_per_day',
        key: 'price_per_day'
    },
    {
        title: 'Booking Date',
        dataIndex: 'craeted_at',
        key: 'craeted_at'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status,record) => (
        status === 'Pending' || status ==='Accepted' ? (
          
          <div className='flex items-center gap-2'>
            <p>{  status}</p>
            <button 
                onClick={() => handleClear(record)} 
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            >
                Clear
            </button>
            </div>
        ) : (
            status
        )
    )
  }
  
];

const handleClear = async (data) => {
  setLoading(true);
  
  try {
   console.log(data.checkin_date);
   
        
    const givenDateString = data.checkin_date;

    const givenDate = new Date(givenDateString);

    const currentDate = new Date();
    
    if (currentDate > givenDate) {
   return   message.success("The current date is greater than the given date.");

        // alert("The current date is greater than the given date.");
    }


    console.log(token);
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/hostel.php?id=${data.id}&value=Cancelled`,
      {}, // Pass an empty object for the request body
      { headers: { Authorization: `Bearer ${token}` } }
    );
  
    console.log(response.data);
    if (response.status === 200) {

      message.success("Hostel deleted successfully");
  fetchUserData();
    
   
      // alert("Successfully added your request!");
      // navigate('/success'); // Uncomment this if you have a success page
    }
  
  } catch (error) {
    console.error("There was an error submitting the form!", error.response || error.message);
    alert("There was an error submitting the form. Please try again.");
  } finally {
    setLoading(false); // Set loading to false after response is received
  }
  

};
  return (
    <>


  {/* <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
    <div class="bg-blue-600 text-white text-center p-4 rounded-t-lg">
      <h1 class="text-2xl font-bold">New Booking Notification</h1>
    </div>
    <div class="p-6">
      <p>Dear Pattabi,</p>
      <p>A new booking has been made at <strong>Pamela Bates</strong>.</p>
      
      <div class="mt-6">
      <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="bg-gray-100 text-left p-4 border-b">Hostel Info</th>
              <th class="bg-gray-100 text-left p-4 border-b">User Info</th>
            </tr>
          </thead>
          <tbody className=''>
            <tr>
            <td class="p-4">
                <div class="space-y-3">
                  <p><strong>Name:</strong> ppp</p>
                  <p><strong>Email:</strong> pattabi@</p>
                  <p><strong>Phone:</strong> 9361120513</p>
                  <p><strong>Dates:</strong> 2024-08-04 to 2024-08-15</p>
                  <p><strong>Total Days:</strong> 11</p>
                  <p><strong>Total Price:</strong> 9900</p>
                </div>
              </td>
              
              <td class="p-4 grid">
                <div class="grid gap-4 ">
                  <p><strong>Name:</strong> Pamela Bates</p>
                  <p><strong>Address:</strong> 123 Hostel Street, City, Country</p>
                  <p><strong>Contact:</strong> 123-456-7890</p>
                </div>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-4">Please prepare for their arrival.</p>
      <p>Thank you!</p>
    </div>
  </div> */}


     {loading && <Loader />}
      <Header />
     <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'NormalUserBookingPage',href: '/normaluserforhos' }]} />

      <DataTable data={hostelBookUser} columns={columns} title=" User Information" />
      <Footer />


      
    </>
  );
};

export default Hosteldetails;














