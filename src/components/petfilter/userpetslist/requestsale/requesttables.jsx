import React from 'react'
import AdoptionRequests from '../../userpetslist/onwerpetsrequest/petowneradoptionRequests';
import Adoptedlits from '../adoptlists/adoptedlists';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw ,faClipboardList ,faEnvelope} from "@fortawesome/free-solid-svg-icons";

import UserPets from '../usersalepetslist/userpetslist';

const Requesttables = () => {
  const [activeTab, setActiveTab] = useState('mypets');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="petsandrequest">


        <div className="request-container">
          <div className="toggle-buttons">
            <Link to={`userSalePets`}>
              <div
                className={`toggle-button ${activeTab === 'mypets' ? 'active' : ''}`}
                onClick={() => handleTabClick('mypets')}
              >
              <span><FontAwesomeIcon icon={faPaw} className="signup-icon" />                UserPetsForSale

</span>
              </div>
            </Link>

            <Link to={`petRequests`}>
              <div
                className={`toggle-button ${activeTab === 'petRequests' ? 'active' : ''}`}
                onClick={() => handleTabClick('petRequests')}
              >
              <span> <FontAwesomeIcon icon={faEnvelope} className="signup-icon" />                PetSaleRequests
   </span>
              </div>
            </Link>

            <Link to={`adoptedPetList`}>
              <div
                className={`toggle-button ${activeTab === 'adoptedPetList' ? 'active' : ''}`}
                onClick={() => handleTabClick('adoptedPetList')}
              >
              <span>
              <FontAwesomeIcon icon={faClipboardList} className="signup-icon" />     Adopt Lists
              </span>
             
              </div>
            </Link>


          </div>

          <div className="togglecontent">
            {activeTab === 'mypets' && (
              <div className="mypets-content">
                <Routes>
                  <Route path="/userSalePets" element={<UserPets />} />
                </Routes>
              </div>
            )}
            {activeTab === 'petRequests' && (
              <div className="request-content">
                <Routes>
                  <Route path="/petRequests" element={<AdoptionRequests />} />
                </Routes>
              </div>
            )}
            {activeTab === 'adoptedPetList' && (
              <div className="adopt-content">
                <Routes>
                  <Route path="/adoptedPetList" element={<Adoptedlits />} />
                </Routes>
              </div>
            )}

          </div>
        </div>
      </div>

    </>
  )
}

export default Requesttables