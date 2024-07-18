import Footer from './components/Siteframe/Footer'
import Header from './components/Siteframe/Header'
// import PetDetail from './components/PetFilter/petDetailInfo/PetInfo'
import SideBar from './components/PetFilter/sideBar/SideBar'
// import './component/PetFilter/sideBar/sideBar.css'

const AllPetList = () => {
  return (
     <>
     <Header />
      <SideBar />
      {/* <PetDetail /> */}
      <Footer />
    </>
  )
}

export default AllPetList
