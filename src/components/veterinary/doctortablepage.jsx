import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, notification } from 'antd';
import Loader from '../Loader/Loader';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSearch,faInbox } from '@fortawesome/free-solid-svg-icons';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './normaltable.css';

const Doctorpersonalpage = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/doctortable.php`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setDoctorData(data);
            setFilteredData(data);
        } catch (error) {
            notification.error({
                message: 'An Error Occurred',
                description: 'There was an error while fetching the data. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = doctorData.filter((doctor) =>
      Object.values(doctor).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  };


  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'status-delivered';
      case 'Pending':
        return 'status-process';
      case 'Cancelled':
        return 'status-canceled';
      default:
        return '';
    }
  };

    const handleAccept = async (data) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/addvetrinarydocformapi.php?id=${data.id}&value=Accepted`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                notification.success({
                    message: 'Appointment Accepted',
                    description: 'Your grooming appointment has been successfully accepted by the doctor.',
                });

                // Send email notification to the user
                await sendEmail(data);

                fetchData(); // Refresh the data after acceptance
            }
        } catch (error) {
            console.error("There was an error submitting the form!", error.response || error.message);
            notification.error({
                message: 'Request Submission Failed',
                description: 'There was an error submitting your request. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/doctoracceptedmail.php`,
                {
                    email: data.grooming_user_email,
                    doctorName: data.grooming_user_name
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                notification.success({
                    message: 'Email Sent',
                    description: 'An email notification has been sent to the user.',
                });
            }
        } catch (error) {
            console.error("There was an error sending the email!", error.response || error.message);
            notification.error({
                message: 'Email Sending Failed',
                description: 'There was an error sending the email notification. Please try again.',
            });
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
            render: (status, record) => (
              <div>
                {status === 'Pending' ? (
                  <button 
                    onClick={() => handleAccept(record)} 
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                ) : (
                  <span className={getStatusClass(status)}>{status}</span>
                )}
              </div>
            )
          }
    ];

   
    
    return (
       <div className='table-container'>
    <div className='doctortablename'>
        <div className="doctertitle">

        <h2>Client Information Overview</h2>

        </div>
        <div className="search-container">
      {searchTerm === '' && (
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          )}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {filteredData.length === 0 ? (
        <div className="no-data-container">
         <img src="../src/assets/emptydata.png" alt="nodata image" />


          
        </div>):(
            
            <Table dataSource={filteredData} columns={columns} rowKey="id" className="tabless" />
            
        
        )}
        </div>
        {loading && <Loader/>}
       </div>
    );
};

export default Doctorpersonalpage;
