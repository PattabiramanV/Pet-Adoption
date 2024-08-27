import './overalltablelisting.css';
import Header from './Header';
import Footer from './Footer';
import Requesttables from '../petfilter/userpetslist/requestsale/requesttables';
import { useState, useEffect } from 'react';
import BreadcrumbComponent from '../commoncomponent/Breadcrumb';
import HostelDataTable from '../../components/pethostel/datatable/request';
import Tablesvent from '../veterinary/usertb';
import Lostusertable from '../lostpets/lostingusertable';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShieldAlt, faStar, faHandsHelping } from "@fortawesome/free-solid-svg-icons";

const breadcrumbItems = {
  'Hostel': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Hostel', href: '/dashboard/userpets' }],
  'Veternarians': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Veterinarians', href: '/dashboard/groomingusertable' }],
  'Lost Pet': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Lost Pet', href: '/dashboard/lost-pet' }],
  'Pet': [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Pet', href: '/dashboard/userSalePets' }]
};

const OverallTables = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(() => {
    const path = location.pathname.split('/').pop();
    return Object.keys(breadcrumbItems).find(item => breadcrumbItems[item].some(crumb => crumb.href.includes(path))) || 'Overview';
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuItemClick = (item, path) => {
    setSelectedItem(item);
    localStorage.setItem('selectedItem', item);
    navigate(path);
  };

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    const currentItem = Object.keys(breadcrumbItems).find(item => breadcrumbItems[item].some(crumb => crumb.href.includes(path)));
    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location]);

  return (
    <>
      <Header />
      <BreadcrumbComponent items={breadcrumbItems[selectedItem] || []} />
      
      <div className={`tablescontainer ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
          <div className="bar">
            <img 
              className="barmenu" 
              src="/src/assets/barmenu1.png" 
              alt="Menu Toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
          <div className={`sidebarlink ${sidebarOpen ? 'show' : 'hide'}`}>
            <ul>
              <li 
                onClick={() => handleMenuItemClick('Hostel', '/dashboard/userpets')} 
                className={selectedItem === 'Hostel' ? 'active' : ''}
              >
                <span>
                  <FontAwesomeIcon icon={faHeart} className="signup-icon" />
                  <span className="signup-text">Hostel</span>
                </span>
              </li>
              <li 
                onClick={() => handleMenuItemClick('Veternarians', '/dashboard/groomingusertable')} 
                className={selectedItem === 'Veternarians' ? 'active' : ''}
              >
                <span>
                  <FontAwesomeIcon icon={faShieldAlt} className="signup-icon" />
                  <span className="signup-text">Veterinarians</span>
                </span>
              </li>
              <li 
                onClick={() => handleMenuItemClick('Lost Pet', '/dashboard/lost-pet')} 
                className={selectedItem === 'Lost Pet' ? 'active' : ''}
              >
                <span>
                  <FontAwesomeIcon icon={faStar} className="signup-icon" />
                  <span className="signup-text">Lost Pet</span>
                </span>
              </li>
              <li 
                onClick={() => handleMenuItemClick('Pet', '/dashboard/userSalePets')} 
                className={selectedItem === 'Pet' ? 'active' : ''}
              >
                <span>
                  <FontAwesomeIcon icon={faHandsHelping} className="signup-icon" />
                  <span className="signup-text">Pet Adoption</span>
                </span>
              </li>
            </ul>
          </div>
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
