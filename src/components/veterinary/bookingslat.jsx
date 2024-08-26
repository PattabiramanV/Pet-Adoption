// import React, { useState, useEffect } from 'react';
// import { Checkbox, Snackbar, Alert } from '@mui/material';
// import Loader from '../Loader/Loader';
// import moment from 'moment';

// const currentDayShowFun = () => {
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, '0');
//     const dd = String(today.getDate()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd}`;
// };

// const formatTime = (date) => {
//     const options = { hour: '2-digit', minute: '2-digit', hour12: true };
//     return date.toLocaleTimeString([], options);
// };

// const generateTimeSlots = (startTime, endTime) => {
//     const start = new Date(startTime);
//     const end = new Date(endTime);
//     const timeSlots = [];

//     while (start < end) {
//         const nextSlot = new Date(start.getTime() + 30 * 60000);
//         timeSlots.push({
//             start: formatTime(start),
//             end: formatTime(nextSlot),
//         });
//         start.setTime(nextSlot.getTime());
//     }

//     return timeSlots;
// };

// const fetchDoctorAvailability = async (doctorId, date) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php?id=${doctorId}&date=${date}`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data"
//             }
//         });
//         if (!response.ok) throw new Error('Network response was not ok');

//         const text = await response.text(); // Get the raw text response
//         console.log("Raw Response:", text);

//         const data = JSON.parse(text); // Parse the JSON manually
//         console.log("Availability slots", data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching doctor availability:', error);
//         return {};
//     }
// };

// const saveSelectedSlots = async (doctorId, date, slots) => {
//     try {
//         const token = localStorage.getItem('token')
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php`, {
//             method: 'POST',
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data"
//             },
//             body: JSON.stringify({ doctorId, date, slots }),
//         });
//         if (!response.ok) throw new Error('Network response was not ok');
//         const result = await response.json();
//         console.log("sssss", doctorId, date, slots);
//         return result;
//     } catch (error) {
//         console.error('Error saving selected slots:', error);
//         return {};
//     }
// };

// function BookingSlot() {
//     const [selectedDate, setSelectedDate] = useState(currentDayShowFun());
//     const [timeSlots, setTimeSlots] = useState([]);
//     const [availability, setAvailability] = useState({ startTime: '09:00 AM', endTime: '05:00 PM' });
//     const [selectedSlots, setSelectedSlots] = useState([]);
//     const [disabledSlots, setDisabledSlots] = useState([]);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [alertOpen, setAlertOpen] = useState(false);
//     const [loading, setLoading] = useState(true);

//     console.log("checked fields slots ", selectedSlots);

//     useEffect(() => {
//         const doctorId = 18;

//         // Load disabled slots from localStorage
//         const savedDisabledSlots = JSON.parse(localStorage.getItem(`disabledSlots-${doctorId}`)) || {};
//         setDisabledSlots(savedDisabledSlots);

//         setLoading(true);
//         fetchDoctorAvailability(doctorId, selectedDate).then(data => {
//             if (data.start_time && data.end_time) {
//                 const startTime = new Date(data.start_time);
//                 const endTime = new Date(data.end_time);
//                 setAvailability({ startTime, endTime });
//                 setTimeSlots(generateTimeSlots(startTime, endTime));
//             } else {
//                 console.error('No availability data found or error fetching data.');
//             }

//             // Pre-select and disable already booked slots for the selected date
//             if (data.bookingslot) {
//                 setSelectedSlots(data.bookingslot);
//                 const updatedDisabledSlots = { ...disabledSlots, [selectedDate]: data.bookingslot };
//                 setDisabledSlots(updatedDisabledSlots);
//             }

//             setIsSubmitted(false); // Reset submit state when date changes
//             setLoading(false);
//         });
//     }, [selectedDate]);

//     const handleDateChange = (event) => {
//         setSelectedDate(event.target.value);
//     };

//     const handleCheckboxChange = (slot) => {
//         setSelectedSlots(prevSlots => {
//             const updatedSlots = prevSlots.includes(slot)
//                 ? prevSlots.filter(s => s !== slot)
//                 : [...prevSlots, slot];
//             return updatedSlots;
//         });
//     };

//     const handleAlertClose = () => {
//         setAlertOpen(false);
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         const doctorId = 18;
//         const result = await saveSelectedSlots(doctorId, selectedDate, selectedSlots);

//         console.log("cccc", result);

//         if (result.success) {
//             const updatedDisabledSlots = {
//                 ...disabledSlots,
//                 [selectedDate]: [...(disabledSlots[selectedDate] || []), ...selectedSlots],
//             };
//             setDisabledSlots(updatedDisabledSlots);

//             // Save disabled slots to localStorage
//             localStorage.setItem(`disabledSlots-${doctorId}`, JSON.stringify(updatedDisabledSlots));

//             setSelectedSlots([]);
//             setIsSubmitted(true);
//             setAlertOpen(true);
//         } else {
//             console.error('Failed to save slots');
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Book Your Pet Grooming Service</h2>
//             <p className="mb-4">Select your pet's grooming service and book an appointment today!</p>

//             <div className="mb-4">
//                 <label htmlFor="appointmentDate" className="block text-lg font-medium mb-2">Select Date</label>
//                 <input
//                     id="appointmentDate"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     type="date"
//                     min={currentDayShowFun()}
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                 />
//             </div>

//             <div>
//                 <h3 className="text-xl font-medium mb-2">Available Time Slots</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     {loading ? (
//                         <Loader />
//                     ) : timeSlots.length > 0 ? (
//                         timeSlots.map((slot, index) => (
//                             <div key={index} className="flex items-center">
//                                 <Checkbox
//                                     checked={selectedSlots.includes(slot.start)}
//                                     onChange={() => handleCheckboxChange(slot.start)}
//                                     disabled={disabledSlots[selectedDate]?.includes(slot.start)}
//                                 />
//                                 <label className="ml-2">{slot.start}</label>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500 col-span-2">No available slots.</p>
//                     )}
//                 </div>
//             </div>

//             <button
//                 className={`mt-6 w-full py-2 px-4 text-white rounded-md ${isSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//                 onClick={handleSubmit}
//             >
//                 Submit
//             </button>

//             {/* Alert Notification */}
//             <Snackbar
//                 open={alertOpen}
//                 autoHideDuration={3000}
//                 onClose={handleAlertClose}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
//                     Slot selection updated!
//                 </Alert>
//             </Snackbar>

//             {loading && <Loader />}
//         </div>
//     );
// }

// export default BookingSlot;







// .....................................................................


import React, { useState, useEffect } from 'react';
import { Checkbox, Snackbar, Alert } from '@mui/material';
import Loader from '../Loader/Loader';
import moment from 'moment';
import axios from 'axios';
import { notification } from 'antd';
// import { fetchDoctorId } from './FetchDoctorId';

const currentDayShowFun = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const formatTime = (date) => {
    // console.log(date);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    // console.log(options);
    // console.log(date.toLocaleTimeString([], options));
    return date.toLocaleTimeString([], options);
};

const generateTimeSlots = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeSlots = [];

    while (start < end) {
        const nextSlot = new Date(start.getTime() + 30 * 60000);
        timeSlots.push({
            start: formatTime(start),
            end: formatTime(nextSlot),
        });
        start.setTime(nextSlot.getTime());
    }
// console.log(timeSlots);
    return timeSlots;
};

const fetchDoctorAvailability = async (doctorId, date) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php?id=${doctorId}&date=${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');

        const text = await response.text(); // Get the raw text response
        console.log("Raw Response:", text);

        const data = JSON.parse(text); // Parse the JSON manually
        console.log("Availability slots", data);
        return data;
    } catch (error) {
        console.error('Error fetching doctor availability:', error);
        return {};
    }
};

const saveSelectedSlots = async (doctorId, date, slots) => {
// console.log('slots',slots);
    // return;
    try {
        const token = localStorage.getItem('token')
        console.log(token);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            body: JSON.stringify({ doctorId, date, slots }),
        });
        console.log(response);
        // console.log("sssss", doctorId, date, slots);
// return;
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        console.log("sssss", doctorId, date, slots);
        return result;
    } catch (error) {
        console.error('Error saving selected slots:', error);
        return {};
    }
};

function BookingSlot() {

  
    const [timeSlots, setTimeSlots] = useState([]);
    const [availability, setAvailability] = useState({ startTime: '09:00 AM', endTime: '05:00 PM' });
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [disabledSlots, setDisabledSlots] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [doctorId,setDoctorId]=useState(null);

    console.log("checked fields slots ", selectedSlots);


    useEffect(() => {
        const fetchDoctorId = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php?endpoint=docId`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            if(response.data.status=='success'){
                setDoctorId(response.data.data.id); 

            }
            else{
                console.log("not fetchhed doctor id");
            }
            } catch (err) {
                console.log('Error fetching doctor ID:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorId();
    }, []); // Empty dependency array means this runs once on component mount

    const [selectedDate, setSelectedDate] = useState(currentDayShowFun());
    console.log('doctorId',doctorId);




    useEffect(() => {

        if (doctorId === null) {
            return; // Do nothing if doctorId is not available
        }
// console.log('doctorId',doctorId);

        const savedDisabledSlots = JSON.parse(localStorage.getItem(`disabledSlots-${doctorId}`)) || {};
        console.log('savedDisabledSlots',savedDisabledSlots);
        setDisabledSlots(savedDisabledSlots);

        setLoading(true);
        fetchDoctorAvailability(doctorId, selectedDate).then(data => {
            console.log('data', data);
        
            if (data[0]?.start_time && data[0]?.end_time) {
                const startTime = new Date(data[0].start_time);
                const endTime = new Date(data[0].end_time);
        
                setAvailability({ startTime, endTime });
                setTimeSlots(generateTimeSlots(startTime, endTime));
            } else {
                console.error('No availability data found or error fetching data.');
            }
        
            // Handle selected and disabled slots
            const bookedSlots = data.map(item => item.bookingslot);
            if (bookedSlots.length > 0) {
                setSelectedSlots(bookedSlots); // Set the booked slots
                // const updatedDisabledSlots = { ...disabledSlots, [selectedDate]: bookedSlots };
                // setDisabledSlots(updatedDisabledSlots);
            } else {
                console.log('No bookings found for the selected date.');
            }
        
            setIsSubmitted(false); // Reset submit state when date changes
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
        
    }, [selectedDate,doctorId]);

    const handleDateChange = (event) => {
        // console.log('pp',event.target.value);
        setSelectedDate(event.target.value);
    };

    const handleCheckboxChange = (slot) => {
        setSelectedSlots(prevSlots => {
            // Ensure no null or undefined values in the previous slots
            const cleanPrevSlots = prevSlots.filter(s => s !== null && s !== undefined);
    
            // Toggle the selected slot
            const updatedSlots = cleanPrevSlots.includes(slot)
                ? cleanPrevSlots.filter(s => s !== slot)
                : [...cleanPrevSlots, slot];
    
            console.log('Updated Slots:', updatedSlots); // This will log the correct updated slots
    
            return updatedSlots;
        });
    
        // To log the updated selectedSlots after the state change, use a useEffect hook
    };
    

    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    console.log('selectedSlots',selectedSlots);

    const handleSubmit = async () => {

        setLoading(true);
        // const doctorId = 14;
        const result = await saveSelectedSlots(doctorId, selectedDate, selectedSlots);

        console.log("cccc", result);

        notification.success({
            message: 'Success',
            description: 'Slots successfully saved.',
        });

      
        setLoading(false);
    };



    return (

        <>
                    {loading && <Loader />}
                
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Book Your Pet Grooming Service</h2>
            <p className="mb-4">Select your pet's grooming service and book an appointment today!</p>

            <div className="mb-4">
                <label htmlFor="appointmentDate" className="block text-lg font-medium mb-2">Select Date</label>
                <input
                    id="appointmentDate"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="date"
                    min={currentDayShowFun()}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div>
                <h3 className="text-xl font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-4">
                    {loading ? (
                        <Loader />
                    ) : timeSlots.length > 0 ? (
                        timeSlots.map((slot, index) => (
                            <div key={index} className="flex items-center">
                                <Checkbox
                                    checked={selectedSlots.includes(slot.start)}
                                    onChange={() => handleCheckboxChange(slot.start)}
                                    id={`checkbox${index}`}
                                    // disabled={disabledSlots[selectedDate]?.includes(slot.start)}
                                />
                                <label htmlFor={`checkbox${index}`} className="ml-2 cursor-pointer">{slot.start}</label>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-2">No available slots.</p>
                    )}
                </div>
            </div>

            <button
                className={`mt-6 w-full py-2 px-4 text-white rounded-md ${isSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={handleSubmit}
            >
                Submit
            </button>

            {/* Alert Notification */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
                    Slot selection updated!
                </Alert>
            </Snackbar>

            {loading && <Loader />}
        </div>

        </>
    );
}

export default BookingSlot;