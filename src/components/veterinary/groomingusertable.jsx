import React from 'react';
// import Footer from "../Siteframe/Footer";
// import Header from "../Siteframe/Header";
import GroomingUsersTable from './normalusertable'; 
// <<<<<<< HEAD
import BreadcrumbComponent from '../commoncomponent/Breadcrumb';
// import '../breadcrums.css';
// =======
// import BreadcrumbComponent from '../../components/commoncomponent/Breadcrumb';
// import '../Breadcrums.css';
// >>>>>>> Ahalya-Vetnarian


function Groomingusertable() {
    return (
        <>
            {/* <Header />
            <BreadcrumbComponent items={[{ title: 'Home', href: '/' },{ title: 'User Management Table',href: '/groomingusertable' }]} /> */}
            <GroomingUsersTable /> 
            {/* <Footer /> */}
        </>
    );
}

export default Groomingusertable;
