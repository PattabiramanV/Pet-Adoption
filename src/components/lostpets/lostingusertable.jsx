import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Modal, Checkbox } from 'antd';
import Loader from '../Loader/Loader';
import EditForm from './editform';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lostpets/lostusertable.css';
import ReactPaginate from 'react-paginate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Lostusertable = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const fetchData = async () => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/model/lostinguserstable.php`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (Array.isArray(response.data)) {
                setUserData(response.data);
            } else {
                setUserData([]);
                setError("Invalid data format received from the server.");
            }
        } catch (error) {
            console.error('Fetch error:', error);
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
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditRecord(null);
    };

    const handleStatusChange = async (record) => {
        const updatedStatus = record.status === 'completed' ? 'pending' : 'completed';
        try {
      const response =  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/model/editform.php`, {
                user_id: record.user_id,
                status: updatedStatus
            });

            console.log(response)
            fetchData(); // Refresh data after updating status
        } catch (error) {
            console.error('Status update error:', error);
            setError("An error occurred while updating status.");
        }
    };
    
const updateRecord = (updatedRecord) => {
    setUserData((prevUserData) =>
        prevUserData.map((item) =>
            item.user_id === updatedRecord.user_id ? { ...item, ...updatedRecord } : item
        )
    );
    fetchData(); // Refresh data after updating status
    setIsModalVisible(false); // Close the modal after updating the record
};

    

    const getStatusClass = (status) => {
        switch (status) {
          case 'completed':
            return 'status-delivered';
          case 'pending':
            return 'status-process';
          default:
            return '';
        }
    };

    const columns = [
        {
            title: 'S.No:',
            key: 'sno',
            render: (_, __, index) => index + 1
        },
        {
            title: 'Photo',
            key: 'photo',
            render: (record) => (
                <img src={`data:image/jpeg;base64,${record.photo}`} alt="Pet" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
            )
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
            title: 'Status',
            key: 'status',
            render: (record) => (
                <div>
                    <Checkbox 
                        checked={record.status === 'completed'} 
                        onChange={() => handleStatusChange(record)}
                    />
                    <span className={`status-label ${getStatusClass(record.status)}`}>
                        {record.status}
                    </span>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <div className="action-buttons">
                    <a onClick={() => showModal(record)}>
                        <button className='Edit-Btn'><FontAwesomeIcon icon={faEdit} /></button>
                    </a>
                </div>
            )
        }
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    const filteredData = userData.filter(item =>
        [item.name, item.contact_no, item.pet_type, item.age, item.location].some(field =>
            String(field).toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
    );

    const currentData = filteredData.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const handlePageClick = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="table-container mt-10 mb-10">
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'inter', fontSize:'24px', fontWeight:'800'}}>Lost Pet Details</h1>
            <div className="search-container">
                {searchTerm === '' && (
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                )}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="search-input searchBox"
                />
            </div>
            {filteredData.length === 0 ? (
                <div className="no-data-container">
                    <p className='text-center'>No data found</p>
                </div>
            ) : (
                <>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key}>{col.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={item.user_id}>
                                    {columns.map((col) => (
                                        <td key={col.key}>{col.render ? col.render(item, null, index) : item[col.dataIndex]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal
                        title="Edit Pet Details"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        {editRecord && <EditForm record={editRecord} onClose={handleCancel} onUpdate={updateRecord} refresh={fetchData} />}
                    </Modal>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(filteredData.length / recordsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active-page'}
                        previousClassName={'previous-page'}
                        nextClassName={'next-page'}
                        disabledClassName={'disabled-page'}
                    />
                </>
            )}
              {loading && <Loader/>}
        </div>
    );
};

export default Lostusertable;







