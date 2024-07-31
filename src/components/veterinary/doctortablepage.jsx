import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert } from 'antd';

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

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div>
            <h1>Doctor Information</h1>
            <Table dataSource={doctorData} columns={columns} rowKey="doctor_name" />
        </div>
    );
};

export default Doctorpersonalpage;
