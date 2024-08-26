import React from 'react'
import AdoptionRequests from '../../userpetslist/onwerpetsrequest/petowneradoptionRequests';
import Adoptedlits from '../adoptlists/adoptedlists';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

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
<Link to={`userpets`}>
  <div
    className={`toggle-button ${activeTab === 'mypets' ? 'active' : ''}`}
    onClick={() => handleTabClick('mypets')}
  >
    My Pets
  </div>
</Link>

<Link to={`request`}>
  <div
    className={`toggle-button ${activeTab === 'request' ? 'active' : ''}`}
    onClick={() => handleTabClick('request')}
  >
   Pet Request
  </div>
</Link>

<Link to={`adoptelist`}>
  <div
    className={`toggle-button ${activeTab === 'adoptelist' ? 'active' : ''}`}
    onClick={() => handleTabClick('adoptelist')}
  >
    Adopt lists
  </div>
</Link>


          </div>

          <div className="togglecontent">
           {activeTab === 'mypets' && (
  <div className="mypets-content">
    <Routes>
      <Route path="/tables" element={<UserPets />} />
      <Route path="userpets" element={<UserPets />} />
    </Routes>
  </div>
)}
{activeTab === 'request' && (
  <div className="request-content">
    <Routes>
      <Route path="request" element={<AdoptionRequests />} />
    </Routes>
  </div>
)}
{activeTab === 'adoptelist' && (
  <div className="adopt-content">
    <Routes>
      <Route path="adoptelist" element={<Adoptedlits />} />
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