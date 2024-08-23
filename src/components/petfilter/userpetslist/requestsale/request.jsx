import './request.css';

import BreadcrumbComponent from '../../../commoncomponent/Breadcrumb';
import Header from '../../../Siteframe/Header';
import Footer from '../../../Siteframe/Footer';
import Requesttables from './requesttables';

const Request = () => {



  return (
    <>
      <Header />
      <BreadcrumbComponent
        items={[{ title: 'Home', href: '/' }, { title: 'YourSalePets', href: '/requestpets/' }]}
      />
      <Requesttables />
      <Footer />
    </>
  );
};

export default Request;
