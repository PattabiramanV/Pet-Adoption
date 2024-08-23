import './tablelrouting.css';

// import UserPets from '../usersalepetslist/userpetslist';
import BreadcrumbComponent from '../../components/commoncomponent/Breadcrumb'
import Header from '../Siteframe/Header';
import Footer from '../Siteframe/Footer';
import Tablesvent from './usertb';
// import AdoptionRequests fro '../../userpetslist/onwerpetsrequest/petowneradoptionRequests';
// import Adoptedlits from '../adoptlists/adoptedlists';


const Venterinarytables = () => {


  return (
    <>
      <Header />
      <BreadcrumbComponent
        items={[{ title: 'Home', href: '/' }, { title: 'Service Records', href: '/venterinarytables/' }]}
      />
      <Tablesvent />
      <Footer />
    </>
  );
};

export default Venterinarytables;