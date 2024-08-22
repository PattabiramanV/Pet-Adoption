import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Map from "./Map/map";
import BreadcrumbComponent from "./commoncomponent/Breadcrumb";





function Location() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Location', href: '/map' }]} />
      <Map/>
      <Footer />
    </>
  );
}

export default Location;