import './overalltablelisting.css';
import Header from './Header';
import Footer from './Footer';
import Requesttables from '../petfilter/userpetslist/requestsale/requesttables';
import { useState } from 'react';
import BreadcrumbComponent from '../commoncomponent/Breadcrumb';

const OverallTables = () => {
  const [selectedItem, setSelectedItem] = useState('Overview');

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Header />
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Action',href: '/tables' }]} />

      <div className="tablescontainer">
        <div className="sidebar">
          <ul>
            <li onClick={() => handleMenuItemClick('Overview')}><span>Grooming</span></li>
            <li onClick={() => handleMenuItemClick('Location')}><span>Docter Info</span></li>
            <li onClick={() => handleMenuItemClick('Live View')}><span>Lost Pet</span></li>
            <li onClick={() => handleMenuItemClick('Pet')}><span>Pet</span></li>
          </ul>
        </div>

        <div className="contenttables">
          {selectedItem === 'Overview' && <div>Grooming</div>}
          {selectedItem === 'Location' && <div>Docter Info</div>}
          {selectedItem === 'Live View' && <div>Lost Pet</div>}
          {selectedItem === 'Pet' && <Requesttables />}
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OverallTables;
