
import Image from './components/Pets/ImageText/ImageText'
import AdoptText from './components/Pets/adopt-text/AdoptText'
import PetList from './components/Pets/Card/PetList'
import ViewMore from './components/Pets/MoreButton/Button'
import ProfileGuide from './components/Pets/setupProfile/ProfileGuide'
import Header from './components/Header_and_Footer/Header'
import Footer from './components/Header_and_Footer/Footer'


const Pets = () => {
  return (
    <>
    <Header />
    <Image />
    <AdoptText />
    <PetList />
    <ViewMore /> 
    <ProfileGuide />
        {/* <Background /> */}
    {/* <Footer /> */}
    <Footer />
    </>

  )
}

export default Pets
