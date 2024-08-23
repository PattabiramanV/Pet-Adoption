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
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Action', href: '/tables' }]} />
      
      <div className="tablescontainer">
        <div className="sidebar">
          <ul>
            <li 
              onClick={() => handleMenuItemClick('Hostel')} 
              className={selectedItem === 'Hostel' ? 'active' : ''}
            >
              <span>Hostel</span>
            </li>
            <li 
              onClick={() => handleMenuItemClick('Veternarians')} 
              className={selectedItem === 'Veternarians' ? 'active' : ''}
            >
              <span>Veternarians</span>
            </li>
            <li 
              onClick={() => handleMenuItemClick('Lost Pet')} 
              className={selectedItem === 'Lost Pet' ? 'active' : ''}
            >
              <span>Lost Pet</span>
            </li>
            <li 
              onClick={() => handleMenuItemClick('Pet')} 
              className={selectedItem === 'Pet' ? 'active' : ''}
            >
              <span>Pet</span>
            </li>
          </ul>
        </div>

        <div className="contenttables">
          {selectedItem === 'Hostel' && <div>Hostel</div>}
          {selectedItem === 'Veternarians' && <div>Veternarians</div>}
          {selectedItem === 'Lost Pet' && <div>Lost Pet</div>}
          {selectedItem === 'Pet' && <Requesttables />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OverallTables;
