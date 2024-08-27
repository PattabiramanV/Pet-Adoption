
import BreadcrumbComponent from './components/commoncomponent/Breadcrumb'
import PetForm from './components/petfilter/sideBar/sidebar'
import Footer from './components/Siteframe/Footer'
import Header from './components/Siteframe/Header'
const AllPetList = () => {
  return (
     <>
     <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'petHighlights',href: '/petHighlights' },{ title: ' Pet Gallery',href: '/PetGallery' }  ]} />
      <PetForm />
      <Footer />
    </>
  )
}

export default AllPetList
