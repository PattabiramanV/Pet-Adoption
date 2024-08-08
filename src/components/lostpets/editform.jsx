
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, message, Checkbox } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './editform.css';

const EditForm = ({ record, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [statusChecked, setStatusChecked] = useState(false);

    // Update form values when record changes
    useEffect(() => {
        if (record) {
            setStatusChecked(record.status === 'completed');
            form.setFieldsValue({
                ...record,
                lost_date: moment(record.lost_date), // Ensure date is in moment object format
            });
        }
    }, [record, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            let token = localStorage.getItem('token');
            const response = await axios.put('http://localhost/petadoption/backend/model/editform.php', {
                ...values,
                status: statusChecked ? 'completed' : 'pending', // Convert boolean back to status string
                user_id: record.id, // Ensure record.id contains the correct user ID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            // Log the response data
            console.log('Response data:', response.data);
            if (response.status === 200) {
                message.success('Pet details updated successfully');
                // fetchData(); // Call to fetch updated data
            }
            onClose();
        } catch (error) {
            console.error('Update error:', error);
            message.error('Failed to update pet details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (e) => {
        setStatusChecked(e.target.checked);
    };

    return (
        <div className="form-wrapper">
            <Form
                form={form}
                onFinish={onFinish}
                className="form-container"
            >
                <div className="form-grid">
                    <div className="left-column">
                        <div className='parentInput'>
                            <div className="div">
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter the pet name' }]}
                                    style={{ marginBottom : '10px'  }}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            name="pet_type"
                            label="Pet Type"
                            rules={[{ required: true, message: 'Please enter the pet type' }]}
                            style={{ marginBottom : '10px'}}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please enter the pet gender' }]}
                            style={{ marginBottom : '10px' }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="age"
                            label="Age"
                            rules={[{ required: true, message: 'Please enter the pet age' }]}
                            style={{ marginBottom : '10px'  }}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="right-column">
                        <Form.Item
                            name="contact_no"
                            label="Contact No"
                            rules={[
                                { required: true, message: 'Please enter the contact number' },
                                { pattern: /^[0-9]{10}$/, message: 'Contact number must be exactly 10 digits' }
                            ]}
                            style={{ marginBottom : '10px'}}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lost_date"
                            label="Lost Date"
                            rules={[{ required: true, message: 'Please select the lost date' }]}
                            style={{ marginBottom : '10px'  }}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: 'Please enter the location' }]}
                            style={{ marginBottom : '10px'  }}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please enter the address' }]}
                    style={{ marginBottom : '10px'}}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                    style={{ marginBottom : '10px' }}
                >
                    <Input />
                </Form.Item>
                   <Form.Item
                            name="status"
                            label="Status"
                            style={{ marginBottom : '10px'}}
                            valuePropName="checked" // Bind checkbox value
                        >
                            <Checkbox checked={statusChecked} onChange={handleStatusChange}>
                                {statusChecked ? 'Completed' : 'Pending'}
                            </Checkbox>
                        </Form.Item>
                <Form.Item>
                    <div className='updatebtn'>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '150px', justifyContent: 'center', alignItems: 'center', marginLeft: '25px', height: '45px', fontSize:  '16px'}}>
                        Update
                    </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditForm;












