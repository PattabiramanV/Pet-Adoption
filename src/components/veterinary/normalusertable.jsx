// src/components/DoctorInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert } from 'antd';
import Loader from '../Loader/Loader';

const DoctorInfo = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem('token');
           
            try {
                const response = await axios.get('http://localhost/petadoption/backend/api/usertable.php', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDoctorData(response.data);
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
            title: 'Needs',
            dataIndex: 'need_for_pet',
            key: 'need_for_pet'
        }
    ];

    if (loading) return <Loader />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div>
            <h1>Doctor Information</h1>
            <Table dataSource={doctorData} columns={columns} rowKey="doctor_id" />
        </div>
    );
};

export default DoctorInfo;
