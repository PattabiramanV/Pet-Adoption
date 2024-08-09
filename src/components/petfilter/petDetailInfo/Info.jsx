import Footer from "../../Siteframe/Footer"
import BreadcrumbComponent from '../../commoncomponent/Breadcrumb'
import Header from "../../Siteframe/Header"
import CardView from "./PetInfo"

const Info = () => {
  return (
    <>
     <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pets',href: '/pets' },{ title: 'Adopte',href: '/adopte' } , { title: 'VIew',href: '/petDetails' }]} />

      <CardView />
    <Footer/>
    </>
   
  )
}

export default Info
