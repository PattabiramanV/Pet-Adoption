import Footer from './components/Siteframe/Footer'
import Header from './components/Siteframe/Header'
import SideBar from './components/petfilter/sideBar/sidebar'
// import CardView from './components/pets/card/card'

const AllPetList = () => {
  return (
     <>
     <Header />
      <SideBar />
      {/* <CardView /> */}
      <Footer />
    </>
  )
}

export default AllPetList
