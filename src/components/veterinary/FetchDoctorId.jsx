import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDoctorId = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDoctorId = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php`, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data); // Debug: Log response data
                setDoctorId(response.data.id); // Adjust based on actual response structure
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorId();
    }, [token]); // Include token in dependency array if it might change

    return { doctorId, loading, error };
};

export default useFetchDoctorId;
