import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Input } from 'antd';
import { notification } from 'antd';
import Loader from '../Loader/Loader';
import './normaltable.css';
import { text } from '@fortawesome/fontawesome-svg-core';

const { Search } = Input;

const DoctorInfo = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let token = localStorage.getItem('token');
    const fetchData = async () => {
           
        try {
            const response = await axios.get('http://localhost/petadoption/backend/api/usertable.php', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setDoctorData(data);
            setFilteredData(data);
        } catch (error) {
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };

   
    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value) => {
        if (!value) {
            setFilteredData(doctorData);
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = doctorData.filter((doctor) =>
                Object.values(doctor).some(val =>
                    typeof val === 'string' && val.toLowerCase().includes(lowercasedValue)
                )
            );
            setFilteredData(filtered);
        }
    };

 
      
    const columns = [
        {
            title: 'Profile',
            dataIndex: 'doctor_profile',
            key: 'doctor_profile',
            render: (text) => <img src={text} alt="Profile" style={{ width: '50px', height: '50px' }} />
        },
        {
            title: 'Name',
            dataIndex: 'doctor_name',
            key: 'doctor_name'
        },
        {
            title: 'Phone',
            dataIndex: 'doctor_phone',
            key: 'doctor_phone'
        },
        {
            title: 'Email',
            dataIndex: 'doctor_email',
            key: 'doctor_email'
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization'
        },
        {
            title: 'City',
            dataIndex: 'doctor_city',
            key: 'doctor_city'
        },
        {
            title: 'State',
            dataIndex: 'doctor_state',
            key: 'doctor_state'
        },
        {
            title: 'Address',
            dataIndex: 'doctor_address',
            key: 'doctor_address'
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
        //  console.log(data.checkin_date);
         
              
        //   const givenDateString = data.checkin_date;
      
        //   const givenDate = new Date(givenDateString);
      
        //   const currentDate = new Date();
          
        //   if (currentDate > givenDate) {
        //  return   message.success("The current date is greater than the given date.");
      
        //       // alert("The current date is greater than the given date.");
        //   }
      
      
       
          const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${data.id}&value=Cancelled`,
            {}, // Pass an empty object for the request body
            { headers: { Authorization: `Bearer ${token}` } }
          );
        
          console.log(response.data);
          if (response.status === 200) {
      
            // message.success("Hostel deleted successfully");
            fetchData();
          
            notification.success({
                message: 'Request Submitted Successfully!',
                description: 'Your grooming request has been successfully submitted.',
            });
            // alert("Successfully added your request!");
            // navigate('/success'); // Uncomment this if you have a success page
          }
        
        } catch (error) {
          console.error("There was an error submitting the form!", error.response || error.message);
         
          notification.error({
            message: 'Request Submission Failed',
            description: 'There was an error submitting your request. Please try again.',
        });
        //   alert("There was an error submitting the form. Please try again.");
        } finally {
          setLoading(false); // Set loading to false after response is received
        }
        
      
      };


    if (loading) return <Loader />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div>
            <h1>Medical Practitioner Details</h1>
            <Search
                placeholder="Search..."
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: '16px', width:'30%'}}
                enterButton
                allowClear
            />
            <Table dataSource={filteredData} columns={columns} rowKey="doctor_id" className="tabless"/>
        </div>
    );
};

export default DoctorInfo;
