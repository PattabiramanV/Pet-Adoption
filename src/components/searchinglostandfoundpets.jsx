import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import Header from './Siteframe/Header';
import Footer from './Siteframe/Footer';
import Reuniting_pets from './reunitingpets/reuniting';
import Lost_pets from './lostpets/lostpetslist';
import Mypost from './lostpets/mypetlist/mylostpetposts';
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';

function Searching_Lost_and_Found_Pets() {
  return (
    <>
      <Header />
        <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet', href: '/findpet' }]} />
      <Reuniting_pets />
      <Mypost />
      <div className="lost_div_more_btn">
        <Link to="/mypetlostpost">
          <button className="lost_more hi">See More</button>
        </Link>
      </div>
      <Lost_pets />
      <div className="lost_div_more_btn">
        <Link to="/lostpetlisting">
          <button className="lost_more hi">See More</button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Searching_Lost_and_Found_Pets;
