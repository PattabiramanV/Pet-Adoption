import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Loader from '../Loader/Loader';
import Checkbox from 'antd/es/checkbox/Checkbox';
import './normaltable.css';

function GroomingPetsForm() {
    const initialFormState = {
        name: "",
        contact: "",
        email: "",
        petType: "",
        petGender: "",
        petAge: "",
        city: "",
        needForPet: "",
        petimage: null,
        selectdoctorname: "",
        doctorAddress: "",
        service: "",
        appointmentDate: '',
    };

    const [applyGrooming, setApplyGrooming] = useState(initialFormState);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(null);
    const [showErrors, setShowErrors] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [disabledSlots, setDisabledSlots] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/retrivevetrinarydocinfoapi.php`)
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                notification.error({
                    message: 'Error Fetching Doctors',
                    description: 'There was an error while fetching the list of doctors. Please try again later.',
                });
            });

        if (applyGrooming.appointmentDate && selectedDoctorId) {
            fetchAvailableSlots(applyGrooming.appointmentDate, selectedDoctorId);
            fetchBookedSlots(selectedDoctorId, applyGrooming.appointmentDate);
        }

    }, [applyGrooming.appointmentDate, selectedDoctorId]);

    const handleFields = (e) => {
        const { name, value, type, files } = e.target;

        if (e.target.tagName === 'SELECT') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedId = selectedOption.id;
            setSelectedDoctorId(selectedId);

            if (name === 'selectdoctorname') {
                const selectedDoctor = doctors.find(doctor => doctor.name === value);
                setApplyGrooming({
                    ...applyGrooming,
                    selectdoctorname: value,
                    doctorAddress: selectedDoctor ? selectedDoctor.address : '',
                });
                setSelectedDoctorId(selectedDoctor ? selectedDoctor.id : null);
            }
        } else if (type === 'file') {
            setApplyGrooming({ ...applyGrooming, [name]: files[0] });
        } else {
            setApplyGrooming({ ...applyGrooming, [name]: value });
        }
    };

    const handleCheckboxChange = (slot) => {
        setSelectedSlots((prevSelected) => {
            const normalizedSlot = moment(slot, 'h:mm A').format('hh:mm a');
            if (prevSelected.includes(normalizedSlot)) {
                return prevSelected.filter((s) => s !== normalizedSlot);
            } else {
                return [...prevSelected, normalizedSlot];
            }
        });
    };

    // const fetchAvailableSlots = (date, doctorId) => {
    //     if (!date || !doctorId) return;

    //     setLoading(true);
    //     axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php`, {
    //         params: { doctorId, date }
    //     })
    //         .then(response => {
    //             if (response.data.message === "Invalid doctor ID") {
    //                 notification.error({
    //                     message: 'Error Fetching Slots',
    //                     description: 'The selected doctor ID is invalid. Please select a different doctor.',
    //                 });
    //                 setDisabledSlots([]);
    //             } else {
    //                 const { start_time, end_time } = response.data;
    //                 if (start_time && end_time) {
    //                     const availableSlots = generateTimeSlots(start_time, end_time);
    //                     setTimeSlots(availableSlots);
    //                 } else {
    //                     notification.error({
    //                         message: 'No Availability',
    //                         description: 'No availability found for the selected doctor.',
    //                     });
    //                     setTimeSlots([]);
    //                 }
    //             }
    //         })
    //         .catch(error => {
    //             notification.error({
    //                 message: 'Error Fetching Slots',
    //                 description: 'There was an error while fetching available slots. Please try again later.',
    //             });
    //             setTimeSlots([]);
    //             setDisabledSlots([]);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

    // const fetchBookedSlots = (doctorId, date) => {
    //     setLoading(true);
    //     axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getingslot.php`, {
    //         params: { doctorId, date }
    //     })
    //         .then(response => {
    //             if (response.data.message === "Invalid doctor ID.") {
    //                 notification.error({
    //                     message: 'Error Fetching Slots',
    //                     description: 'The selected doctor ID is invalid. Please select a different doctor.',
    //                 });
    //                 setTimeSlots([]);
    //                 setDisabledSlots([]);
    //             } else {
    //                 const bookedSlots = response.data.bookedSlots;
    //                 bookedSlots.length !== 0 ? setSelectedSlots(bookedSlots[0]) : setSelectedSlots([]);
    //                 handleBookedSlots(bookedSlots);
    //             }
    //         })
    //         .catch(error => {
    //             notification.error({
    //                 message: 'Error Fetching Slots',
    //                 description: 'There was an error while fetching booked slots. Please try again later.',
    //             });
    //             setDisabledSlots([]);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

    const generateTimeSlots = (startTime, endTime, interval = 30) => {
        const startMoment = moment(startTime, 'HH:mm:ss');
        const endMoment = moment(endTime, 'HH:mm:ss');
        const slots = [];
        let currentTime = startMoment;

        while (currentTime <= endMoment) {
            slots.push(currentTime.format('h:mm A'));
            currentTime = currentTime.add(interval, 'minutes');
        }

        return slots;
    };

    const handleBookedSlots = (bookedSlots) => {
        const formattedSlots = bookedSlots.map(slot => moment(slot, 'HH:mm:ss').format('HH:mm:ss'));
        setDisabledSlots(formattedSlots);
    };

    const validateFields = () => {
        const errors = {};
        if (!applyGrooming.name) errors.name = 'Name is required';
        if (!applyGrooming.contact || applyGrooming.contact.length < 9) errors.contact = 'Valid contact number is required';
        if (!applyGrooming.email || !/\S+@\S+\.\S+/.test(applyGrooming.email)) errors.email = 'Valid email is required';
        if (!applyGrooming.petType) errors.petType = 'Pet type is required';
        if (!applyGrooming.petGender) errors.petGender = 'Pet gender is required';
        if (!applyGrooming.petAge) errors.petAge = 'Pet age is required';
        if (!applyGrooming.city) errors.city = 'City is required';
        if (!applyGrooming.needForPet) errors.needForPet = 'Description of needs is required';
        if (!applyGrooming.petimage) errors.petimage = 'Pet image is required';
        if (!applyGrooming.selectdoctorname) errors.selectdoctorname = 'Doctor selection is required';
        if (!applyGrooming.service) errors.service = 'Service type is required';
        if (!applyGrooming.appointmentDate) errors.appointmentDate = 'Appointment date is required';
        if (selectedSlots.length === 0) errors.selectedSlot = 'At least one appointment slot is required';

        setError(errors);
        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            notification.error({
                message: 'Please Fix the Errors Above',
                description: 'Ensure all fields are filled out correctly.',
            });
            setTimeout(() => {
                setShowErrors(false);
            }, 3000);
        }

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        setSuccess(null);
        setLoading(true);
        if (!validateFields()) {
            setLoading(false);
            return;
        }

        const formData = new FormData();
        const token = localStorage.getItem('token');

        for (const key in applyGrooming) {
            if (applyGrooming.hasOwnProperty(key)) {
                formData.append(key, applyGrooming[key]);
            }
        }

        formData.append('selectedSlots', JSON.stringify(selectedSlots));

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/groomingformapi.php`,
                formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            setError({});
            if (res.data.status) {
                notification.success({
                    message: 'Your request was successfully submitted!',
                    description: res.data.message || 'Your grooming appointment was submitted successfully.',
                });
                setApplyGrooming(initialFormState);
                setSelectedSlots([]);
            } else {
                notification.error({
                    message: 'Failed to Submit the Form',
                    description: res.data.message || 'There was an error submitting your grooming appointment. Please try again later.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Submission Error',
                description: error.response?.data?.message || 'There was an error submitting your grooming appointment. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="custom-div max-w-4xl mx-auto p-8 mb-5 mt-5">
            <h2 className="title">APPLAY GROOMING </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Name </label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none  ${error.name ? 'border-red-500' : ''}`}
                type="text"
                name="name"
                value={applyGrooming.name}
                onChange={handleFields}
                placeholder="Name"
            />
            {showErrors && error.name && <p className="text-red-600 text-sm">{error.name}</p>}
        </div>

        {/* Contact */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact <span className="text-red-500">*</span></label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.contact ? 'border-red-500' : ''}`}
                type="number"
                name="contact"
                value={applyGrooming.contact}
                onChange={handleFields}
                placeholder="Contact"
            />
            {showErrors && error.contact && <p className="text-red-600 text-sm">{error.contact}</p>}
        </div>

        {/* Email */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Email <span className="text-red-500">*</span></label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.email ? 'border-red-500' : ''}`}
                type="email"
                name="email"
                value={applyGrooming.email}
                onChange={handleFields}
                placeholder="Email"
                required
            />
            {showErrors && error.email && <p className="text-red-600 text-sm">{error.email}</p>}
        </div>

        {/* Pet Type */}
        <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">Pet Type </label>
    <input
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.petType ? 'border-red-500' : ''}`}
        type="text"
        name="petType"
        value={applyGrooming.petType}
        onChange={handleFields}
        placeholder="Enter Pet Type"
        required
    />
    {showErrors && error.petType && <p className="text-red-600 text-sm">{error.petType}</p>}
</div>

        {/* Pet Gender */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Gender</label>

            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.petimage ? 'border-red-500' : ''}`}
                type="text"
                name="petGender"
                value={applyGrooming.petGender}
                onChange={handleFields}
            />
            
            {showErrors && error.petGender && <p className="text-red-600 text-sm">{error.petGender}</p>}
        </div>

        {/* Pet Age */}
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Age <span className="text-red-500">*</span></label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.petAge ? 'border-red-500' : ''}`}
                type="text"
                name="petAge"
                value={applyGrooming.petAge}
                onChange={handleFields}
                placeholder="Pet Age"
                required
            />
            {showErrors && error.petAge && <p className="text-red-600 text-sm">{error.petAge}</p>}
        </div>

        {/* City */}
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">City <span className="text-red-500">*</span></label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.city ? 'border-red-500' : ''}`}
                type="text"
                name="city"
                value={applyGrooming.city}
                onChange={handleFields}
                placeholder="City"
                required
            />
            {showErrors && error.city && <p className="text-red-600 text-sm">{error.city}</p>}
        </div>

  {/* Service */}
  <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Service <span className="text-red-500">*</span></label>
            <select
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                            id="sevice"
                            name="sevice"
                            value={applyGrooming.sevice}
                            onChange={handleFields}
                        >
                            <option value="">Select service</option>
                            <option value="Pet Bothing">Bothing</option>
                            <option value="Tick Remove">Tick Remove</option>
                            <option value="Bothing + Tick Remove">Bothing + Tick Remove</option>
                            <option value="Cutting">Cutting</option>
                            <option value="Bathing + Cutting">Bathing + Cutting</option>
                        </select>
                        {error.sevice && <p className="text-red-600 text-sm">{error.sevice}</p>}
                    </div>
        {/* Need for Pet */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Need for Pet </label>
            <textarea
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.needForPet ? 'border-red-500' : ''}`}
                name="needForPet"
                value={applyGrooming.needForPet}
                onChange={handleFields}
                placeholder="Why do you need a pet?"
                required
            ></textarea>
            {showErrors && error.needForPet && <p className="text-red-600 text-sm">{error.needForPet}</p>}
        </div>

        {/* Pet Image */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Image <span className="text-red-500">*</span></label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.petimage ? 'border-red-500' : ''}`}
                type="file"
                name="petimage"
                onChange={handleFields}
                required
            />
            {showErrors && error.petimage && <p className="text-red-600 text-sm">{error.petimage}</p>}
        </div>

        {/* Select Doctor */}
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Doctor <span className="text-red-500">*</span></label>
            <select
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.selectdoctorname ? 'border-red-500' : ''}`}
                name="selectdoctorname"
                value={applyGrooming.selectdoctorname}
                onChange={handleFields}
                required
            >
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor.id} id={doctor.id} value={doctor.name}>
                        {doctor.name}
                    </option>
                ))}
            </select>
            {showErrors && error.selectdoctorname && <p className="text-red-600 text-sm">{error.selectdoctorname}</p>}
        </div>

        {/* Doctor's Address */}
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-2">Doctor's Address</label>
            <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
                type="text"
                name="doctorAddress"
                value={applyGrooming.doctorAddress}
                onChange={handleFields}
                readOnly
            />
        </div>

      

        {/* Appointment Date */}
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Appointment Date <span className="text-red-500">*</span></label>
            <input
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${error.appointmentDate ? 'border-red-500' : ''}`}
                type="date"
                name="appointmentDate"
                value={applyGrooming.appointmentDate}
                // onChange={handleFields}
                required
            />
            {showErrors && error.appointmentDate && <p className="text-red-600 text-sm">{error.appointmentDate}</p>}
        </div>



<div className="form-group">
<label className="block text-gray-700 text-sm font-bold mb-2">Select Slots:</label>
{loading ? (
    <p className="text-gray-500">Loading slots...</p>
) : (
    timeSlots.length > 0 ? (
        timeSlots.map((slot, index) => (
            <Checkbox
                key={index}
                value={slot}
                checked={selectedSlots.includes(slot)}
                onChange={() => handleCheckboxChange(slot)}
                disabled={disabledSlots.includes(slot)}
            >
                {slot}
            </Checkbox>
        ))
    ) : (
        <p className="text-gray-500">No available slots.</p>
    )
)}
{showErrors && error.selectedSlot && <p className="text-red-500 text-sm">{error.selectedSlot}</p>}
</div>

    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
        <button
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            type="submit"
        >
            Submit
        </button>
    </div>
</form>

        </div>
    );
}

export default GroomingPetsForm;




// //////////////////////////////////////////////////////////////////////////














//  ipa iruka fom slote code........

// <div className="form-group">
// <label className="block text-gray-700 text-sm font-bold mb-2">Select Slots:</label>
// {loading ? (
//     <p className="text-gray-500">Loading slots...</p>
// ) : (
//     timeSlots.length > 0 ? (
//         timeSlots.map((slot, index) => (
//             <Checkbox
//                 key={index}
//                 value={slot}
//                 checked={selectedSlots.includes(slot)}
//                 onChange={() => handleCheckboxChange(slot)}
//                 disabled={disabledSlots.includes(slot)}
//             >
//                 {slot}
//             </Checkbox>
//         ))
//     ) : (
//         <p className="text-gray-500">No available slots.</p>
//     )
// )}
// {showErrors && error.selectedSlot && <p className="text-red-500 text-sm">{error.selectedSlot}</p>}
// </div>
































// .............................................................................................

// import React, { useState, useEffect } from 'react';
// import { notification } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import Loader from '../Loader/Loader';
// import Checkbox from 'antd/es/checkbox/Checkbox';
// import './normaltable.css';

// function GroomingPetsForm() {
//     const initialFormState = {
//         name: "",
//         contact: "",
//         email: "",
//         petType: "",
//         petGender: "",
//         petAge: "",
//         city: "",
//         needForPet: "",
//         petimage: null,
//         selectdoctorname: "",
//         doctorAddress: "",
//         service: "",
//         appointmentDate: '',
//     };

//     const [applyGrooming, setApplyGrooming] = useState(initialFormState);
//     const [error, setError] = useState({});
//     const [success, setSuccess] = useState(null);
//     const [showErrors, setShowErrors] = useState(false);
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [timeSlots, setTimeSlots] = useState([]);
//     const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//     const [selectedSlots, setSelectedSlots] = useState([]);
//     const [disabledSlots, setDisabledSlots] = useState([]);

//     useEffect(() => {
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/retrivevetrinarydocinfoapi.php`)
//             .then(response => {
//                 setDoctors(response.data);
//             })
//             .catch(error => {
//                 notification.error({
//                     message: 'Error Fetching Doctors',
//                     description: 'There was an error while fetching the list of doctors. Please try again later.',
//                 });
//             });

//         if (applyGrooming.appointmentDate && selectedDoctorId) {
//             fetchAvailableSlots(applyGrooming.appointmentDate, selectedDoctorId);
//             fetchBookedSlots(selectedDoctorId, applyGrooming.appointmentDate);
//         }

//     }, [applyGrooming.appointmentDate, selectedDoctorId]);

//     const handleFields = (e) => {
//         const { name, value, type, files } = e.target;

//         if (e.target.tagName === 'SELECT') {
//             const selectedOption = e.target.options[e.target.selectedIndex];
//             const selectedId = selectedOption.id;
//             setSelectedDoctorId(selectedId);

//             if (name === 'selectdoctorname') {
//                 const selectedDoctor = doctors.find(doctor => doctor.name === value);
//                 setApplyGrooming({
//                     ...applyGrooming,
//                     selectdoctorname: value,
//                     doctorAddress: selectedDoctor ? selectedDoctor.address : '',
//                 });
//                 setSelectedDoctorId(selectedDoctor ? selectedDoctor.id : null);
//             }
//         } else if (type === 'file') {
//             setApplyGrooming({ ...applyGrooming, [name]: files[0] });
//         } else {
//             setApplyGrooming({ ...applyGrooming, [name]: value });
//         }
//     };

//     const handleCheckboxChange = (slot) => {
//         setSelectedSlots((prevSelected) => {
//             const normalizedSlot = moment(slot, 'h:mm A').format('hh:mm a');
//             if (prevSelected.includes(normalizedSlot)) {
//                 return prevSelected.filter((s) => s !== normalizedSlot);
//             } else {
//                 return [...prevSelected, normalizedSlot];
//             }
//         });
//     };

//     const fetchAvailableSlots = (date, doctorId) => {
//         if (!date || !doctorId) return;

//         setLoading(true);
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/doctorslottimeapi.php`, {
//             params: { doctorId, date }
//         })
//             .then(response => {
//                 if (response.data.message === "Invalid doctor ID") {
//                     notification.error({
//                         message: 'Error Fetching Slots',
//                         description: 'The selected doctor ID is invalid. Please select a different doctor.',
//                     });
//                     setDisabledSlots([]);
//                 } else {
//                     const { start_time, end_time } = response.data;
//                     if (start_time && end_time) {
//                         const availableSlots = generateTimeSlots(start_time, end_time);
//                         setTimeSlots(availableSlots);
//                     } else {
//                         notification.error({
//                             message: 'No Availability',
//                             description: 'No availability found for the selected doctor.',
//                         });
//                         setTimeSlots([]);
//                     }
//                 }
//             })
//             .catch(error => {
//                 notification.error({
//                     message: 'Error Fetching Slots',
//                     description: 'There was an error while fetching available slots. Please try again later.',
//                 });
//                 setTimeSlots([]);
//                 setDisabledSlots([]);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const fetchBookedSlots = (doctorId, date) => {
//         setLoading(true);
//         axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getingslot.php`, {
//             params: { doctorId, date }
//         })
//             .then(response => {
//                 if (response.data.message === "Invalid doctor ID.") {
//                     notification.error({
//                         message: 'Error Fetching Slots',
//                         description: 'The selected doctor ID is invalid. Please select a different doctor.',
//                     });
//                     setTimeSlots([]);
//                     setDisabledSlots([]);
//                 } else {
//                     const bookedSlots = response.data.bookedSlots;
//                     bookedSlots.length !== 0 ? setSelectedSlots(bookedSlots[0]) : setSelectedSlots([]);
//                     handleBookedSlots(bookedSlots);
//                 }
//             })
//             .catch(error => {
//                 notification.error({
//                     message: 'Error Fetching Slots',
//                     description: 'There was an error while fetching booked slots. Please try again later.',
//                 });
//                 setDisabledSlots([]);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const generateTimeSlots = (startTime, endTime, interval = 30) => {
//         const startMoment = moment(startTime, 'HH:mm:ss');
//         const endMoment = moment(endTime, 'HH:mm:ss');
//         const slots = [];
//         let currentTime = startMoment;

//         while (currentTime <= endMoment) {
//             slots.push(currentTime.format('h:mm A'));
//             currentTime = currentTime.add(interval, 'minutes');
//         }

//         return slots;
//     };

//     const handleBookedSlots = (bookedSlots) => {
//         const formattedSlots = bookedSlots.map(slot => moment(slot, 'HH:mm:ss').format('HH:mm:ss'));
//         setDisabledSlots(formattedSlots);
//     };

//     const validateFields = () => {
//         const errors = {};
//         if (!applyGrooming.name) errors.name = 'Name is required';
//         if (!applyGrooming.contact || applyGrooming.contact.length < 9) errors.contact = 'Valid contact number is required';
//         if (!applyGrooming.email || !/\S+@\S+\.\S+/.test(applyGrooming.email)) errors.email = 'Valid email is required';
//         if (!applyGrooming.petType) errors.petType = 'Pet type is required';
//         if (!applyGrooming.petGender) errors.petGender = 'Pet gender is required';
//         if (!applyGrooming.petAge) errors.petAge = 'Pet age is required';
//         if (!applyGrooming.city) errors.city = 'City is required';
//         if (!applyGrooming.needForPet) errors.needForPet = 'Description of needs is required';
//         if (!applyGrooming.petimage) errors.petimage = 'Pet image is required';
//         if (!applyGrooming.selectdoctorname) errors.selectdoctorname = 'Doctor selection is required';
//         if (!applyGrooming.service) errors.service = 'Service type is required';
//         if (!applyGrooming.appointmentDate) errors.appointmentDate = 'Appointment date is required';
//         if (selectedSlots.length === 0) errors.selectedSlot = 'At least one appointment slot is required';

//         setError(errors);
//         if (Object.keys(errors).length > 0) {
//             setShowErrors(true);
//             notification.error({
//                 message: 'Please Fix the Errors Above',
//                 description: 'Ensure all fields are filled out correctly.',
//             });
//             setTimeout(() => {
//                 setShowErrors(false);
//             }, 3000);
//         }

//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError({});
//         setSuccess(null);
//         setLoading(true);
//         if (!validateFields()) {
//             setLoading(false);
//             return;
//         }

//         const formData = new FormData();
//         const token = localStorage.getItem('token');

//         for (const key in applyGrooming) {
//             if (applyGrooming.hasOwnProperty(key)) {
//                 formData.append(key, applyGrooming[key]);
//             }
//         }

//         formData.append('selectedSlots', JSON.stringify(selectedSlots));

//         try {
//             const res = await axios.post(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/groomingformapi.php`,
//                 formData, {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 },
//             });
//             setError({});
//             if (res.data.status) {
//                 notification.success({
//                     message: 'Your request was successfully submitted!',
//                     description: res.data.message || 'Your grooming appointment was submitted successfully.',
//                 });
//                 setApplyGrooming(initialFormState);
//                 setSelectedSlots([]);
//             } else {
//                 notification.error({
//                     message: 'Failed to Submit the Form',
//                     description: res.data.message || 'There was an error submitting your grooming appointment. Please try again later.',
//                 });
//             }
//         } catch (error) {
//             notification.error({
//                 message: 'Submission Error',
//                 description: error.response?.data?.message || 'There was an error submitting your grooming appointment. Please try again later.',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Name:</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={applyGrooming.name}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.name && <p className="text-red-500 text-sm">{error.name}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Contact:</label>
//                 <input
//                     type="text"
//                     name="contact"
//                     value={applyGrooming.contact}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.contact && <p className="text-red-500 text-sm">{error.contact}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={applyGrooming.email}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.email && <p className="text-red-500 text-sm">{error.email}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Pet Type:</label>
//                 <select
//                     name="petType"
//                     value={applyGrooming.petType}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 >
//                     <option value="">Select Pet Type</option>
//                     <option value="Dog">Dog</option>
//                     <option value="Cat">Cat</option>
//                 </select>
//                 {showErrors && error.petType && <p className="text-red-500 text-sm">{error.petType}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Pet Gender:</label>
//                 <select
//                     name="petGender"
//                     value={applyGrooming.petGender}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                 </select>
//                 {showErrors && error.petGender && <p className="text-red-500 text-sm">{error.petGender}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Pet Age:</label>
//                 <input
//                     type="text"
//                     name="petAge"
//                     value={applyGrooming.petAge}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.petAge && <p className="text-red-500 text-sm">{error.petAge}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">City:</label>
//                 <input
//                     type="text"
//                     name="city"
//                     value={applyGrooming.city}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.city && <p className="text-red-500 text-sm">{error.city}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Need for Pet:</label>
//                 <textarea
//                     name="needForPet"
//                     value={applyGrooming.needForPet}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 ></textarea>
//                 {showErrors && error.needForPet && <p className="text-red-500 text-sm">{error.needForPet}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Pet Image:</label>
//                 <input
//                     type="file"
//                     name="petimage"
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.petimage && <p className="text-red-500 text-sm">{error.petimage}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Select Doctor:</label>
//                 <select
//                     name="selectdoctorname"
//                     value={applyGrooming.selectdoctorname}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 >
//                     <option value="">Select Doctor</option>
//                     {doctors.map(doctor => (
//                         <option key={doctor.id} id={doctor.id} value={doctor.name}>
//                             {doctor.name} - {doctor.specialization}
//                         </option>
//                     ))}
//                 </select>
//                 {showErrors && error.selectdoctorname && <p className="text-red-500 text-sm">{error.selectdoctorname}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Doctor's Address:</label>
//                 <input
//                     type="text"
//                     name="doctorAddress"
//                     value={applyGrooming.doctorAddress}
//                     onChange={handleFields}
//                     className="form-control"
//                     readOnly
//                 />
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Service:</label>
//                 <input
//                     type="text"
//                     name="service"
//                     value={applyGrooming.service}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.service && <p className="text-red-500 text-sm">{error.service}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Appointment Date:</label>
//                 <input
//                     type="date"
//                     name="appointmentDate"
//                     value={applyGrooming.appointmentDate}
//                     onChange={handleFields}
//                     className="form-control"
//                     required
//                 />
//                 {showErrors && error.appointmentDate && <p className="text-red-500 text-sm">{error.appointmentDate}</p>}
//             </div>
//             <div className="form-group">
//                 <label className="block text-gray-700 font-semibold mb-2">Select Slots:</label>
//                 {loading ? (
//                     <p className="text-gray-500">Loading slots...</p>
//                 ) : (
//                     timeSlots.length > 0 ? (
//                         timeSlots.map((slot, index) => (
//                             <Checkbox
//                                 key={index}
//                                 value={slot}
//                                 checked={selectedSlots.includes(slot)}
//                                 onChange={() => handleCheckboxChange(slot)}
//                                 disabled={disabledSlots.includes(slot)}
//                             >
//                                 {slot}
//                             </Checkbox>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No available slots.</p>
//                     )
//                 )}
//                 {showErrors && error.selectedSlot && <p className="text-red-500 text-sm">{error.selectedSlot}</p>}
//             </div>
//             <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 rounded"
//                 disabled={loading}
//             >
//                 {loading ? 'Submitting...' : 'Submit'}
//             </button>
//         </form>
//     );
// }

// export default GroomingPetsForm;
