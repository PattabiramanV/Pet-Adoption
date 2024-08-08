import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import MyLostPostPet from "./lostpets/mypetlist/mylostpetlist";
import BreadcrumbComponent from '../components/lostpetbreadcrumbs';



function lostlistmainpage() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'FoundPetList', href: '/mypetlostpost' }]} />
      <MyLostPostPet/>
      <Footer />
    </>
  );
}

export default lostlistmainpage;