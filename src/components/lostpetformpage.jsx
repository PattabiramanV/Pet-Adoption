import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Lostpetsform from "./lostpets/lostpetsform";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';




function lostpetandform() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet',href: '/findpet' },{ title: 'Lost Post Form',href: '/lostingpet' }]} />
      <Lostpetsform/>
      <Footer />
    </>
  );
}

export default lostpetandform;