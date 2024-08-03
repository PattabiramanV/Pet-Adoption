import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import DataTable from "../components/commoncomponent/DataTable";


const Hosteldetails = () => {
  const [hostelBookUser, setHostelBookUser] = useState(null);
  const token = localStorage.getItem("token"); // Replace with your actual token

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hostelbook.php?endpoint=hostel_user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHostelBookUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []); // Empty dependency array means this effect runs once when the component mounts
  console.log(hostelBookUser);
  const columns = [
    {
        title: 'Profile',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text) => (
            <img
                src={text ? `../../backend/profile/uploads/${text}` : "https://via.placeholder.com/150"}
                alt="Profile"
                style={{ width: '50px', height: '50px' }}
            />
        )
    },    
    {
        title: 'User',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city'
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state'
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'Hostel',
        dataIndex: 'name',
        key: 'name'
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
  
];
  return (
    <>
      <Header />
      <DataTable data={hostelBookUser} columns={columns} title="Hostel User Information" />
      <Footer />
    </>
  );
};

export default Hosteldetails;
