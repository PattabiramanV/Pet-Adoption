import React,{useRef,useState}from "react";

import Footer from "./Siteframe/Footer";
import Header from "./Siteframe/Header";

import GrommingForm from './veterinary/groomingbookingform';
import PetGroomingPage from "./veterinary/petgromming";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';

// import Bookingform from "./veterinary/groomingBookingform";

const GroomingPage=()=>{

    const formRef = useRef(null);
    const [selectedService, setSelectedService] = useState('');

    const scrollToForm = (service) => {
        setSelectedService(service);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header />
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Pet Grooming', href: '/PetGrooming' }]} />

            <PetGroomingPage scrollToForm={scrollToForm} setSelectedService={setSelectedService} />
            <div ref={formRef}>
                <GrommingForm initialService={selectedService} />
            </div>

            <Footer />
        </>
    )
}

export default GroomingPage;