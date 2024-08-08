import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Checkboxpost from "./lostpets/mypetlist/checkboxlostpet";
import BreadcrumbComponent from '../components/lostpetbreadcrumbs';


function checkboxpetpost() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'LostPetlist', href: '/lostpetlisting' },{ title: 'PetsDetail', href: '/checkboxpage' }]} />
      <Checkboxpost/>
      <Footer />
    </>
  );
}

export default checkboxpetpost;