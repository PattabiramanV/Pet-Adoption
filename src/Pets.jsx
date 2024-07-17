
import Image from './components/Pets/ImageText/ImageText'
import AdoptText from './components/Pets/adopt-text/AdoptText'
import PetList from './components/Pets/Card/PetList'
import ViewMore from './components/Pets/MoreButton/Button'
import ProfileGuide from './components/Pets/setupProfile/ProfileGuide'
import Header from './components/Siteframe/Header'
import Footer from './components/Siteframe/Footer'


const Pets = () => {
  return (
    <>
    <Header />
    <Image />
    <AdoptText />
    <PetList />
    <ViewMore /> 
    <ProfileGuide />
    <Footer />
    </>

  )
}

export default Pets
