import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Modal } from 'antd';
import EditForm from './editform'; // Ensure EditForm component is correctly imported



const Lostusertable = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editRecord, setEditRecord] = useState(null);

    const fetchData = async () => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost/petadoption/backend/model/lostinguserstable.php', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Response data:', response.data);  // Log the response data for debugging

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

   
    useEffect(() => {
        fetchData();
    }, []);

    const showModal = (record) => {
      
        setEditRecord(record);
        setIsModalVisible(true);
        // fetchData();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditRecord(null);
    };

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
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Pet Type',
            dataIndex: 'pet_type',
            key: 'pet_type'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Lost Date',
            dataIndex: 'lost_date',
            key: 'lost_date'
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
        },
        {
            title: 'Contact No',
            dataIndex: 'contact_no',
            key: 'contact_no'
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <a onClick={() => showModal(record)}>Edit</a>
            )
        },
        {
            title:'status',
            key:'status',
            render: (record) => {
                return record.status === 'completed'? <span style={{ color: 'green' }}>Completed</span> : <span style={{ color:'red' }}>Pending</span>
            }  // Add conditional rendering for status coloring (green for completed, red for incomplete)
        }

    ];  

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: 'purple' }}>Lost Pet Details</h1>
            <Table dataSource={userData} columns={columns} rowKey="user_id" className='usertsble'/>
            <Modal 
                title="Edit Pet Details" 
                visible={isModalVisible} 
                onCancel={handleCancel}
                footer={null}
            >
                {editRecord && <EditForm record={editRecord} onClose={handleCancel} />}
            </Modal>
        </div>
    );
};

export default Lostusertable;
