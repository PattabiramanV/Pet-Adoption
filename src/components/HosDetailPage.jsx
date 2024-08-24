import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import HostelDetails from "../components/pethostel/HosDetail";
import BreadcrumbComponent from './commoncomponent/Breadcrumb'; // Adjust the path as necessary

const HosDetailPage=()=>{


    return(

        <>
        <Header></Header>
      {/* <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pet Hostel',href: '/pethostel' },{ title: 'Pet Detail Page',href: './pethostel' }]} /> */}
      <BreadcrumbComponent 
  items={[
    { title: 'Home', href: '/' }, 
    { title: 'Pet Hostels', href: '/pethostel' },
    { title: 'Pet Detail', href: '/pethostel/details' }
  ]} 
/>

        <HostelDetails></HostelDetails>
        <Footer></Footer>
        </>
    )



}


export default HosDetailPage;




