
import Image from './components/pets/imagetext/imagetext'
import AdoptText from './components/pets/adopt-text/AdoptText'

import ProfileGuide from './components/pets/setupprofile/profileguide'
import Header from './components/Siteframe/Header'
import Footer from './components/Siteframe/Footer'
// import PetList from './components/pets/card/petlist';
import ViewMore from './components/pets/morebutton/button'


const Pets = () => {
  return (
    <>
    <Header />
    <Image />
    <AdoptText />
    {/* <PetList /> */}
    <ViewMore /> 
    <ProfileGuide />
    <Footer />
    </>

  )
}

export default Pets
