// import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Siteframe/Header';
import Footer from './Siteframe/Footer';
import Reuniting_pets from './reunitingpets/reuniting';
import Lost_pets from './lostpets/lostpetslist';
import Mypost from './lostpets/mypetlist/mylostpetposts';
import BreadcrumbComponent from '../components/lostpetbreadcrumbs';
import { Link } from'react-router-dom'; // Import Link for navigation

function Searching_Lost_and_Found_Pets() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = () => {
    navigate('/lostpetlisting'); // Navigate to the desired route
  };



  const Navigation = () => {
    navigate('/mypetlostpost'); // Navigate to the desired route
  };

  return (
    <>
      <Header />
   
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting',href: '/findpet' },]} />
    
      {/* <Link to=> */}
        {/* <button>Normal User</button> */}
      {/* </Link> */}
      <Reuniting_pets />
      <Mypost/>
      <div className="div_more_btn">
      <button className="more hi" onClick={Navigation}>See more</button>
      </div>
      <Lost_pets />
      <div className="div_more_btn">
      <button className="more hi" onClick={handleNavigation}>See more</button>

      </div>

      <Footer />
    </>
  );
}

export default Searching_Lost_and_Found_Pets;
