import Footer from "../components/Siteframe/Footer";
import Header from "../components/Siteframe/Header";
import PetaddForm from "./pethostel/addhostel/AddPetForHos";
import BreadcrumbComponent from "../components/commoncomponent/Breadcrumb";

const AddHosPage=()=>{

    return (

        <>
        <Header></Header>
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Add Hostel',href: '/pethostel' }]} />
        
        <PetaddForm>
        </PetaddForm>
        <Footer></Footer>

        </>
    )


}


export default AddHosPage;