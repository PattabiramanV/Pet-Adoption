import Footer from './components/Siteframe/Footer'
import Header from './components/Siteframe/Header'
// import PetDetail from './components/PetFilter/petDetailInfo/PetInfo'
import SideBar from './components/petfilter/sideBar/sidebar'

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
