import { useState } from 'react';
import './request.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// import UserPets from '../usersalepetslist/userpetslist';
// import BreadcrumbComponent from '../../commoncomponent/Breadcrumb';
// import Header from '../../Siteframe/Header';
// import Footer from '../../Siteframe/Footer';
import HostelUserTable from './HostelUserTable';
import UserTable from './NormalUserforHos';

const Request = () => {

  const [activeTab, setActiveTab] = useState('mypets');
const handleTabClick = (tab) => {
  setActiveTab(tab);
};


  return (
    <>
      {/* <Header /> */}
      {/* <BreadcrumbComponent
        items={[{ title: 'Home', href: '/' }, { title: 'YourSalePets', href: '/requestpets/' }]}
      /> */}

      <div className="petsandrequest">


        <div className="request-container">

          <div className="toggle-buttons">
            
<Link to={`userpets`}>
  <div
    className={`toggle-button ${activeTab === 'mypets' ? 'active' : ''}`}
    onClick={() => handleTabClick('mypets')}
  >
    My Booking
  </div>
</Link>

<Link to={`request`}>
  <div
    className={`toggle-button ${activeTab === 'request' ? 'active' : ''}`}
    onClick={() => handleTabClick('request')}
  >
    Hostel Request
  </div>
</Link>




          </div>

          <div className="togglecontent">
           {activeTab === 'mypets' && (
  <div className="mypets-content">
    <Routes>
      <Route path="/" element={<UserTable />} />
      <Route path="userpets" element={<UserTable />} />
    </Routes>
  </div>
)}
{activeTab === 'request' && (
  <div className="request-content">
    <Routes>
      <Route path="request" element={<HostelUserTable />} />
    </Routes>
  </div>
)}

          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Request;
