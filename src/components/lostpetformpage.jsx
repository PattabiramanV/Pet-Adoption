import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Lostpetsform from "./lostpets/lostpetsform";
import BreadcrumbComponent from '../components/lostpetbreadcrumbs';




function lostpetandform() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting',href: '/findpet' },{ title: 'LostPostForm',href: '/lostingpet' }]} />
      <Lostpetsform/>
      <Footer />
    </>
  );
}

export default lostpetandform;