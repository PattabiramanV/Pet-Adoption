import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert } from 'antd';

const Lostusertable = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost/petadoption/backend/model/lostinguserstable.php', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Response data say hi:', response.data);  // Log the response data for debugging

                // Ensure response data is an array
                if (Array.isArray(response.data)) {
                    setUserData(response.data);
                } else {
                    setUserData([]);
                    setError("Invalid data format received from the server.");
                }
            } catch (error) {
                console.error('Fetch error:', error);  // Log any fetch errors for debugging
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (text) => (
                text ? <img src={`data:image/jpeg;base64,${text}`} alt="Pet" style={{ width: '50px', height: '50px' }} /> : null
            )
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Pet Type',
            dataIndex: 'pet_type',
            key: 'pet_type'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Contact No',
            dataIndex: 'contact_no',
            key: 'contact_no'
        },
        {
            title: 'Lost Date',
            dataIndex: 'lost_date',
            key: 'lost_date'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        }
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div>
            <h1>Lost Pet Details</h1>
            <Table dataSource={userData} columns={columns} rowKey="user_id" />
        </div>
    );
};

export default Lostusertable;
