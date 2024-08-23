import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import MyLostPostPet from "./lostpets/mypetlist/mylostpetlist";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';



function lostlistmainpage() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet', href: '/findpet' },{ title: 'Found Pet List', href: '/mypetlostpost' }]} />
      <MyLostPostPet/>
      <Footer />
    </>
  );
}

export default lostlistmainpage;