import Image from './components/pets/imagetext/imagetext';
import AdoptText from './components/pets/adopt-text/AdoptText';
import ProfileGuide from './components/pets/setupprofile/profileguide';
import Header from './components/Siteframe/Header';
import Footer from './components/Siteframe/Footer';
import ViewMore from './components/pets/morebutton/button';
import CardView from './components/pets/card/card';
import BreadcrumbComponent from './components/commoncomponent/Breadcrumb'


const Pets = () => {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pets',href: '/pets' }]} />
      
      <Image />
        <ProfileGuide />
      <AdoptText />
      <ViewMore />
    
      <Footer />
    </>
  );
};

export default Pets;
