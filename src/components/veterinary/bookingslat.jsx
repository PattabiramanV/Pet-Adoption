import React, { useEffect, useState } from 'react';
import { Checkbox, Snackbar, Alert } from '@mui/material';

const currentDayShowFun = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
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

    return timeSlots;
};




const fetchDoctorAvailability = async (doctorId, date) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php?id=${doctorId}&date=${date}`);
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
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ doctorId, date, slots }),
        });
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
    const [selectedDate, setSelectedDate] = useState(currentDayShowFun());
    const [timeSlots, setTimeSlots] = useState([]);
    const [availability, setAvailability] = useState({ startTime: '09:00 AM', endTime: '05:00 PM' });
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [disabledSlots, setDisabledSlots] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    console.log("checked fields slots ",selectedSlots);

    useEffect(() => {
        const doctorId = 18;

        // Load disabled slots from localStorage
        const savedDisabledSlots = JSON.parse(localStorage.getItem(`disabledSlots-${doctorId}`)) || {};
        setDisabledSlots(savedDisabledSlots);

        fetchDoctorAvailability(doctorId, selectedDate).then(data => {
            if (data.start_time && data.end_time) {
                const startTime = new Date(data.start_time);
                const endTime = new Date(data.end_time);
                setAvailability({ startTime, endTime });
                setTimeSlots(generateTimeSlots(startTime, endTime));
            } else {
                console.error('No availability data found or error fetching data.');
            }

            // Pre-select and disable already booked slots for the selected date
            if (data.bookingslot) {
                setSelectedSlots(data.bookingslot);
                const updatedDisabledSlots = { ...disabledSlots, [selectedDate]: data.bookingslot };
                setDisabledSlots(updatedDisabledSlots);
            }

            setIsSubmitted(false); // Reset submit state when date changes
        });
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleCheckboxChange = (slot) => {
        setSelectedSlots(prevSlots => {
            const updatedSlots = prevSlots.includes(slot)
                ? prevSlots.filter(s => s !== slot)
                : [...prevSlots, slot];
            return updatedSlots;
        });
    };


    // const handleCheckboxChange = (slot) => {
    //     setSelectedSlots(prevSlots => {
    //         let updatedSlots;
    
    //         if (prevSlots.includes(slot)) {
    //             // Remove the slot if it's already selected
    //             updatedSlots = prevSlots.split(',').filter(s => s !== slot).join(',');
    //              setSelectedSlots(slot);
    //         } else {
    //             // Add the slot if it's not selected
    //             updatedSlots = prevSlots ? `${prevSlots},${slot}` : slot;
    //         }
    
    //         return updatedSlots;
    //     });
    // };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleSubmit = async () => {
      
        const doctorId = 18;
        const result = await saveSelectedSlots(doctorId, selectedDate, selectedSlots);

        console.log("cccc", result);

        if (result.success) {
            const updatedDisabledSlots = {
                ...disabledSlots,
                [selectedDate]: [...(disabledSlots[selectedDate] || []), ...selectedSlots],
            };
            setDisabledSlots(updatedDisabledSlots);

            // Save disabled slots to localStorage
            localStorage.setItem(`disabledSlots-${doctorId}`, JSON.stringify(updatedDisabledSlots));

            setSelectedSlots([]);
            setIsSubmitted(true);
            setAlertOpen(true);
        } else {
            console.error('Failed to save slots');
        }
    };

    return (
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
            <p className="text-gray-500 col-span-2">Loading slots...</p>
        ) : timeSlots.length > 0 ? (
            timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center">
                    <Checkbox
                        checked={selectedSlots.includes(slot)}
                        onChange={() => handleCheckboxChange(slot)}
                        disabled={disabledSlots.includes(moment(slot.split(" - ")[0], ['hh:mm A']).format('hh:mm A'))}
                    />
                    <label className="ml-2 text-gray-700">{slot}</label>
                </div>
            ))
        ) : (
            <p className="text-gray-500 col-span-2">No available slots.</p>
        )}
    </div>
    {showErrors && error.selectedSlot && <p className="text-red-500 text-sm mt-2">{error.selectedSlot}</p>}
</div>


            {/* <div>
                <h3 className="text-xl font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="flex items-center">
                            <Checkbox
                                checked={selectedSlots.includes(slot.start)}
                                onChange={() => handleCheckboxChange(slot.start)}
                                disabled={disabledSlots[selectedDate]?.includes(slot.start)}
                            />
                            <label className="ml-2">{slot.start}</label>
                        </div>
                    ))}
                </div>
            </div> */}

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
        </div>
    );
}

export default BookingSlot;
