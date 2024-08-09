import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Checkboxpost from "./lostpets/mypetlist/checkboxlostpet";
import BreadcrumbComponent from './commoncomponent/Breadcrumb';


function checkboxpetpost() {
  return (
    <>
      <Header />
      <div className="Breadcrumbs">
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'LostPetlist', href: '/lostpetlisting' },{ title: 'PetsDetail', href: '/checkboxpage' }]} />
      </div>
      <Checkboxpost/>
      <Footer />
    </>
  );
}

export default checkboxpetpost;