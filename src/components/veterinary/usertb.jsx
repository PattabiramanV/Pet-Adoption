import Groomingusertable from '../veterinary/groomingusertable';
import Doctorpersonalpage from '../veterinary/doctortablepage';
import BookingSlat from '../veterinary/bookingslat';
import EditDoctorInformation from '../veterinary/doctorprofileedit';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';

function Tablesvent() {
    const [activeTab, setActiveTab] = useState('mypets');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="petsandrequest">


                <div className="request-container">
                    <div className="toggle-buttons">
                        <Link to={`groomingusertable`}>
                            <div
                                className={`toggle-button ${activeTab === 'mypets' ? 'active' : ''}`}
                                onClick={() => handleTabClick('mypets')}
                            >
                              Personal Record Hub

                            </div>
                        </Link>

                        <Link to={`doctorpersonaltable`}>
                            <div
                                className={`toggle-button ${activeTab === 'request' ? 'active' : ''}`}
                                onClick={() => handleTabClick('request')}
                            >
                              Medical Practitioner Record
                            </div>
                        </Link>

                        <Link to={`BookingSlat`}>
                            <div
                                className={`toggle-button ${activeTab === 'slat' ? 'active' : ''}`}
                                onClick={() => handleTabClick('slat')}
                            >
                              Booking Slot
                            </div>
                        </Link>

                        {/* <Link to={`EditDoctorInformation`}>
                            <div
                                className={`toggle-button ${activeTab === 'Edit Doctor Profile' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Edit Doctor Profile')}
                            >
                              Booking Slot
                            </div>
                        </Link> */}



                    </div>

                    <div className="togglecontent">
                        {activeTab === 'mypets' && (
                            <div className="mypets-content">
                                <Routes>
                                    <Route path="/tables/groomingusertable" element={<Groomingusertable />} />
                                    <Route path="/groomingusertable" element={<Groomingusertable />} />
                                </Routes>
                            </div>
                        )}
                        {activeTab === 'request' && (
                            <div className="request-content">
                                <Routes>
                                  
                                    <Route path="/doctorpersonaltable" element={<Doctorpersonalpage />} />
                                </Routes>
                            </div>
                        )}

                        {activeTab === 'slat' && (
                            <div className="slat-content">
                                <Routes>
                                   
                                    <Route path="/BookingSlat" element={<BookingSlat />} />
                                </Routes>
                            </div>
                        )}


                            {/* {activeTab === 'Edit Doctor Profile' && (
                            <div className="slat-content">
                                <Routes>
                                   
                                    <Route path="/doctorprofileedit" element={<EditDoctorInformation />} />
                                </Routes>
                            </div>
                        )}           */}


                    </div>
                </div>
            </div>
        </>
    )
}


export default Tablesvent;