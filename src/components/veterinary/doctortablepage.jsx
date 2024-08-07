import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Alert } from 'antd';
import { notification } from 'antd';
import Loader from '../Loader/Loader';
import './normaltable.css';

const { Search } = Input;

const Doctorpersonalpage = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/petadoption/backend/api/doctortable.php', {
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
            dataIndex: 'users_profile',
            key: 'users_profile',
            render: (text) => <img src={text} alt="Profile" style={{ width: '50px', height: '50px' }} />
        },
        {
            title: 'User Name',
            dataIndex: 'grooming_user_name',
            key: 'grooming_user_name'
        },
        {
            title: 'Phone',
            dataIndex: 'grooming_user_phone',
            key: 'grooming_user_phone'
        },
        {
            title: 'Email',
            dataIndex: 'grooming_user_email',
            key: 'grooming_user_email'
        },
        {
            title: 'Pet Type',
            dataIndex: 'pet_type',
            key: 'pet_type'
        },
        {
            title: 'Pet Gender',
            dataIndex: 'pet_gender',
            key: 'pet_gender'
        },
        {
            title: 'Pet Age',
            dataIndex: 'pet_age',
            key: 'pet_age'
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city'
        },
        {
            title: 'Needs',
            dataIndex: 'what_you_need_for_your_pet',
            key: 'what_you_need_for_your_pet'
        },
       
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status,record) => (
                status === 'Pending' ? (
                  <button 
                  onClick={() => handleAccept(record)} 
                  className="bg-green-500 text-white px-4 py-2 rounded"
              >
                  Accept
              </button>
      
                ) : (
                    status
                )
            )
        }
      
    ];



    const handleAccept = async(data) => {

        try {
console.log(data);


          setLoading(true);
      
          const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${data.id}&value=Accepted`,
            {}, // Pass an empty object for the request body
            { headers: { Authorization: `Bearer ${token}` } }
          );
        
          console.log(response.data);
          if (response.status === 200) {
            notification.success({
                message: 'Doctor Accepted Your Appointment',
                description: 'Your grooming appointment has been successfully accepted by the doctor.',
            });
            // message.success("Hostel Accepted successfully");
      
            fetchData();
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
            <h1>Client Information Overview</h1>
            <Search
                placeholder="Search..."
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: '16px', width:'30%'}}
                enterButton
                allowClear
            />
            <Table dataSource={filteredData} columns={columns} rowKey="doctor_name" className="tabless" />

        </div>
    );
};

export default Doctorpersonalpage;
