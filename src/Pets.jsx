import { useEffect, useState } from 'react';
import Image from './components/pets/imagetext/imagetext';
import AdoptText from './components/pets/adopt-text/AdoptText';
import ProfileGuide from './components/pets/setupprofile/profileguide';
import Header from './components/Siteframe/Header';
import Footer from './components/Siteframe/Footer';
import ViewMore from './components/pets/morebutton/button';
import CardView from './components/pets/card/card';
import BreadcrumbComponent from './components/breedcrumbs'


const Pets = () => {
const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost/petadoption/backend/pets_api/get_limited_pet.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pets',href: '/pets' }]} />
      
      <Image />
      <AdoptText />
       <CardView pets={pets} />
      <ViewMore />
      <ProfileGuide />
      <Footer />
    </>
  );
};

export default Pets;
