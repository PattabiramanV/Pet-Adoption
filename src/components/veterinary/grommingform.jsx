import React, { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";
import moment from "moment";
import Loader from "../Loader/Loader";
// import Checkbox from 'antd/es/checkbox/Checkbox';
import TimeSlotCheckbox from "../veterinary/TimeSlotCheckbox";
import "./normaltable.css";
import { Checkbox, Snackbar, Alert } from "@mui/material";

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
    appointmentDate: "",
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
  const [currentDate, setCurrentDate] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const currentDayShowFun = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      setCurrentDate(formattedDate);
    };

    currentDayShowFun();

    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/retrivevetrinarydocinfoapi.php`
      )
      .then((response) => {
        setDoctors(response?.data);
      })
      .catch((error) => {
        notification.error({
          message: "Error Fetching Doctors",
          description:
            "There was an error while fetching the list of doctors. Please try again later.",
        });
      });
  }, []);

  // console.log('currentDate',currentDate);
  useEffect(() => {
    if (applyGrooming.appointmentDate && selectedDoctorId) {
      fetchAvailableSlots(applyGrooming.appointmentDate, selectedDoctorId);
      // fetchBookedSlots(selectedDoctorId, applyGrooming.appointmentDate);
    }
  }, [applyGrooming.appointmentDate]);

  const handleFields = (e) => {
    const { name, value, type, files } = e.target;

    // const { name, value } = event.target;
   
    console.log(name);
    if (e.target.tagName === "SELECT") {
      const selectedOption = e.target.options[e.target.selectedIndex];
    console.log('selectedOption',selectedOption);

      if (name === "selectdoctorname") {    

        const selectedId = selectedOption.id;
        setSelectedDoctorId(selectedId);
        console.log("selectedId", selectedId);

        const selectedDoctor = doctors.find((doctor) => doctor.name === value);
        setApplyGrooming({
          ...applyGrooming,
          selectdoctorname: value,
          doctorAddress: selectedDoctor ? selectedDoctor.address : "",
        });
        setSelectedDoctorId(selectedDoctor ? selectedDoctor.id : null);
        console.log("selectedDoctor", selectedDoctor);
        setTimeSlots(
          generateTimeSlots(
            selectedDoctor.available_timing_from,
            selectedDoctor.available_timing_to
          )
        );
        if(applyGrooming.appointmentDate!=''){
            setSelectedSlots([]);
      fetchAvailableSlots(applyGrooming.appointmentDate, selectedDoctor.id);

        }

      }

      else{

         setApplyGrooming(prevState => ({
      ...prevState,
      [name]: value,
    }));


      }

    }
    
    else if (type === "file") {
      setApplyGrooming({ ...applyGrooming, [name]: files[0] });
    } else {
      setApplyGrooming({ ...applyGrooming, [name]: value });
    }
  };

//   console.log("timeSlots", timeSlots);
//   console.log('applyGrooming',applyGrooming);

  //...........................handleCheckboxChange..................//

  const handleCheckboxChange = (slot) => {
    setSelectedSlots((prevSlots) => {
      // Ensure no null or undefined values in the previous slots
      const cleanPrevSlots = prevSlots.filter(
        (s) => s !== null && s !== undefined
      );

      // Toggle the selected slot
      const updatedSlots = cleanPrevSlots.includes(slot)
        ? cleanPrevSlots.filter((s) => s !== slot)
        : [...cleanPrevSlots, slot];

      console.log("Updated Slots:", updatedSlots); // This will log the correct updated slots

      return updatedSlots;
    });

    // To log the updated selectedSlots after the state change, use a useEffect hook
  };

console.log('SelectedSlots',selectedSlots);

  //.............................Generate timing slots............//

  const formatTime = (date) => {
    // console.log(date);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };

    return date.toLocaleTimeString([], options);
  };
  //   setAvailability({ startTime, endTime });

  const generateTimeSlots = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const slotTiming = [];

    while (start < end) {
      const nextSlot = new Date(start.getTime() + 30 * 60000);
      slotTiming.push({
        start: formatTime(start),
        end: formatTime(nextSlot),
      });
      start.setTime(nextSlot.getTime());
    }
    // console.log(timeSlots);
    return slotTiming;
  };

  const fetchAvailableSlots = (date, doctorId) => {
    if (!date || !doctorId) return;

    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/doctorslottimeapi.php?endpoint=grooming`,
        {
          params: { doctorId, date },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // console.log(respo);
        if (response.data.message === "Invalid doctor ID") {
          notification.error({
            message: "Error Fetching Slots",
            description:
              "The selected doctor ID is invalid. Please select a different doctor.",
          });
          setDisabledSlots([]);
        } else {
      

        // Handle selected and disabled slots
        const bookedSlots = response.data.data.map(item => item.bookingslot);
        console.log('bookedSlots',bookedSlots);
        if (bookedSlots.length > 0) {
      
            setDisabledSlots(bookedSlots);
            setSelectedSlots([]);
        } else {
            setDisabledSlots([])
            console.log('No bookings found for the selected date.');
        }

        }
      })
      .catch((error) => {
        notification.error({
          message: "Error Fetching Slots",
          description:
            "There was an error while fetching available slots. Please try again later.",
        });
        // setTimeSlots([]);
        // setDisabledSlots([]);
      })
      .finally(() => {
        setLoading(false);

      });
  };

console.log('disabledSlots',disabledSlots);
  
  

  const validateFields = () => {
    const errors = {};
    if (!applyGrooming.name) errors.name = "Name is required";
    if (!applyGrooming.contact || applyGrooming.contact.length < 9)
      errors.contact = "Valid contact number is required";
    if (!applyGrooming.email || !/\S+@\S+\.\S+/.test(applyGrooming.email))
      errors.email = "Valid email is required";
    if (!applyGrooming.petType) errors.petType = "Pet type is required";
    if (!applyGrooming.petGender) errors.petGender = "Pet gender is required";
    if (!applyGrooming.petAge) errors.petAge = "Pet age is required";
    if (!applyGrooming.city) errors.city = "City is required";
    if (!applyGrooming.needForPet)
      errors.needForPet = "Description of needs is required";
    if (!applyGrooming.petimage) errors.petimage = "Pet image is required";
    if (!applyGrooming.selectdoctorname)
      errors.selectdoctorname = "Doctor selection is required";
    if (!applyGrooming.service) errors.service = "Service type is required";
    if (!applyGrooming.appointmentDate)
      errors.appointmentDate = "Appointment date is required";
    if (selectedSlots.length === 0)
      errors.selectedSlot = "At least one appointment slot is required";

    setError(errors);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      notification.error({
        message: "Please Fix the Errors Above",
        description: "Ensure all fields are filled out correctly.",
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
    const token = localStorage.getItem("token");

    for (const key in applyGrooming) {
      if (applyGrooming.hasOwnProperty(key)) {
        formData.append(key, applyGrooming[key]);
      }
    }

    formData.append("selectedSlots", JSON.stringify(selectedSlots));
  console.log('formData',formData);
//   return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/groomingformapi.php`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setError({});
      if (res.data.status) {
        notification.success({
          message: "Your request was successfully submitted!",
          description:
            res.data.message ||
            "Your grooming appointment was submitted successfully.",
        });
        setApplyGrooming(initialFormState);
        setSelectedSlots([]);
      } else {

         
        
        notification.error({
          message: "Failed to Submit the Form",
          description:
            res.data.message ||
            "There was an error submitting your grooming appointment. Please try again later.",
        });


      }
    } catch (error) {
      notification.error({
        message: "Submission Error",
        description:
          error.response?.data?.message ||
          "There was an error submitting your grooming appointment. Please try again later.",
      });
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <div className="custom-div max-w-4xl mx-auto p-8 mb-5 mt-5">
      <h2 className="title">APPLAY GROOMING SERVICE</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name{" "} 
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none  ${
                error.name ? "border-red-500" : ""
              }`}
              type="text"
              name="name"
              value={applyGrooming.name}
              onChange={handleFields}
              placeholder="Name"
            />
            {error.name && error.name && (
              <p className="text-red-600 text-sm">{error.name}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contact <span className="text-red-500">*</span>
            </label>
            <input
              className={` custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.contact ? "border-red-500" : ""
              }`}
              type="number"
              name="contact"
              value={applyGrooming.contact}
              onChange={handleFields}
              placeholder="Contact"
            />
            {error.contact && error.contact && (
              <p className="text-red-600 text-sm">{error.contact}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className=" block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.email ? "border-red-500" : ""
              }`}
              type="email"
              name="email"
              value={applyGrooming.email}
              onChange={handleFields}
              placeholder="Email"
            />
            {error.email && error.email && (
              <p className="text-red-600 text-sm">{error.email}</p>
            )}
          </div>

          {/* Pet Type */}
          <div>
            <label className=" block text-gray-700 text-sm font-bold mb-2">
              Pet Type{" "}
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.petType ? "border-red-500" : ""
              }`}
              type="text"
              name="petType"
              value={applyGrooming.petType}
              onChange={handleFields}
              placeholder="Enter Pet Type"
            />
            {error.petType && error.petType && (
              <p className="text-red-600 text-sm">{error.petType}</p>
            )}
          </div>

          {/* Pet Gender */}
          <div>
  <label className="block text-sm font-bold mb-2">Pet Gender</label>

  <select
    className={`custom-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
      error.petGender ? "border-red-500" : ""
    }`}
    name="petGender"
    value={applyGrooming.petGender}
    onChange={handleFields}
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>

  {error.petGender && (
    <p className="text-red-600 text-sm">{error.petGender}</p>
  )}
</div>


          {/* Pet Age */}
          <div>
            <label className="block  text-sm font-bold mb-2">
              Pet Age <span className="text-red-500">*</span>
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.petAge ? "border-red-500" : ""
              }`}
              type="number"
              name="petAge"
              value={applyGrooming.petAge}
              onChange={handleFields}
              placeholder="Pet Age"
            />
            {error.petAge && error.petAge && (
              <p className="text-red-600 text-sm">{error.petAge}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block  text-sm font-bold mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.city ? "border-red-500" : ""
              }`}
              type="text"
              name="city"
              value={applyGrooming.city}
              onChange={handleFields}
              placeholder="City"
            />
            {error.city && error.city && (
              <p className="text-red-600 text-sm">{error.city}</p>
            )}
          </div>

          {/* Service */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service <span className="text-red-500">*</span>
            </label>
            <select
              className="custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
              id="service"
              value={applyGrooming.service}
              name="service"
              onChange={handleFields}
            >
              <option value="Select service">Select service</option>
              <option value="Pet Bathing">Bathing</option>
              <option value="Tick Remove">Tick Remove</option>
              <option value="Bathing + Tick Remove">
                Bathing + Tick Remove
              </option>
              <option value="Cutting">Cutting</option>
              <option value="Bathing + Cutting">Bathing + Cutting</option>
            </select>
            {error.service && (
              <p className="text-red-600 text-sm">{error.service}</p>
            )}
          </div>
          {/* Need for Pet */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Need for Pet{" "}
            </label>
            <textarea
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.needForPet ? "border-red-500" : ""
              }`}
              name="needForPet"
              value={applyGrooming.needForPet}
              onChange={handleFields}
              placeholder="Why do you need a pet?"
            ></textarea>
            {error.needForPet && error.needForPet && (
              <p className="text-red-600 text-sm">{error.needForPet}</p>
            )}
          </div>

          {/* Pet Image */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pet Image <span className="text-red-500">*</span>
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.petimage ? "border-red-500" : ""
              }`}
              type="file"
              name="petimage"
              onChange={handleFields}
            />
            {error.petimage && error.petimage && (
              <p className="text-red-600 text-sm">{error.petimage}</p>
            )}
          </div>

          {/* Select Doctor */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Doctor <span className="text-red-500">*</span>
            </label>
            <select
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.selectdoctorname ? "border-red-500" : ""
              }`}
              name="selectdoctorname"
              value={applyGrooming.selectdoctorname}
              onChange={handleFields}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} id={doctor.id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {error.selectdoctorname && error.selectdoctorname && (
              <p className="text-red-600 text-sm">{error.selectdoctorname}</p>
            )}
          </div>

          {/* Doctor's Address */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Doctor's Address
            </label>
            <input
              className="custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
              type="text"
              name="doctorAddress"
              placeholder="address"
              value={applyGrooming.doctorAddress}
              onChange={handleFields}
              readOnly
            />
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Appointment Date <span className="text-red-500">*</span>
            </label>
            <input
              className={`custum-input w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                error.appointmentDate ? "border-red-500" : ""
              }`}
              type="date"
              name="appointmentDate"
              value={applyGrooming.appointmentDate || ""} // Keep the value or set it to an empty string
              onChange={handleFields}
              required
              min={currentDate}
              disabled={!applyGrooming.selectdoctorname} // Disable the input if no doctor is selected
            />
            {error.appointmentDate && (
              <p className="text-red-600 text-sm">{error.appointmentDate}</p>
            )}
          </div>


          <div>
            <h3 className="text-xl font-medium mb-2">Available Time Slots</h3>
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                <Loader />
              ) : timeSlots.length > 0 && applyGrooming.appointmentDate ? (
                timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center">
                    <Checkbox
                      checked={selectedSlots.includes(slot.start)}
                      onChange={() => handleCheckboxChange(slot.start)}
                      id={`checkbox${index}`}
                    //   onClick={() => handleSlotClick(slot)}
                      disabled={disabledSlots.includes(slot.start)} // Disable if date not chosen
                    />
                    <label
                      htmlFor={`checkbox${index}`}
                      className={`ml-2 cursor-pointer ${
                        !applyGrooming.appointmentDate &&
                        "text-gray-500 cursor-not-allowed"
                      }`}
                    //   onClick={() => handleSlotClick(slot)}
                    >
                      {slot.start}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">No available slots.</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="custom-button mt-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {loading && <Loader />}
    </div>
  );
}

export default GroomingPetsForm;
