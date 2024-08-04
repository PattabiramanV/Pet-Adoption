import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert } from 'antd';
import Loader from '../Loader/Loader';
import './normaltable.css';

const Doctorpersonalpage = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost/petadoption/backend/api/doctortable.php', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // Validate response data
                const data = Array.isArray(response.data) ? response.data : [];
                setDoctorData(data);
            } catch (error) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
            title: 'Doctor Name',
            dataIndex: 'doctor_name',
            key: 'doctor_name'
        },
        {
            title: 'Doctor Address',
            dataIndex: 'doctor_address',
            key: 'doctor_address'
        }
    ];

    if (loading) return <Loader />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div>
            <h1>Doctor Information</h1>
            <Table dataSource={doctorData} columns={columns} rowKey="doctor_name" className="tabless" />
        </div>
    );
};

export default Doctorpersonalpage;
