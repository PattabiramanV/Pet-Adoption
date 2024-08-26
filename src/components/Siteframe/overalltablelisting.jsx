import './overalltablelisting.css';
import Header from './Header';
import Footer from './Footer';
import Requesttables from '../petfilter/userpetslist/requestsale/requesttables';
import { useState } from 'react';
import BreadcrumbComponent from '../commoncomponent/Breadcrumb';
import HostelDataTable from '../../components/pethostel/datatable/request';
import Tablesvent from '../veterinary/usertb';
import Lostusertable from '../lostpets/lostingusertable';

const breadcrumbItems = {
  'Hostel': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/tables' }, { title: 'Hostel', href: '/tables/hostel' }],
  'Veternarians': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/tables' }, { title: 'Veterinarians', href: '/tables/venterinarytables' }],
  'Lost Pet': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/tables' }, { title: 'Lost Pet', href: '/tables/lost-pet' }],
  'Pet': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/tables' }, { title: 'Pet', href: '/tables/pet' }]
};

const OverallTables = () => {
  const [selectedItem, setSelectedItem] = useState(() => {
    return localStorage.getItem('selectedItem') || 'Overview';
  });

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    localStorage.setItem('selectedItem', item); 
  };

  return (
    <>
      <Header />
      <BreadcrumbComponent items={breadcrumbItems[selectedItem] || []} />
      
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
              <span>Veterinarians</span>
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
          {selectedItem === 'Hostel' && <HostelDataTable />}
          {selectedItem === 'Veternarians' && <Tablesvent />}
          {selectedItem === 'Lost Pet' && <Lostusertable />}
          {selectedItem === 'Pet' && <Requesttables />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OverallTables;