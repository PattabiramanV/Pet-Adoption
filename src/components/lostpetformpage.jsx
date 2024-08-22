import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Lostpetsform from "./lostpets/lostpetsform";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';




function lostpetandform() {
  return (
    <>
      <Header />
      <div className="Breadcrumbs">
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting',href: '/findpet' },{ title: 'LostPostForm',href: '/lostingpet' }]} />
      </div>
      <Lostpetsform/>
      <Footer />
    </>
  );
}

export default lostpetandform;