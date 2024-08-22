import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import MyLostPostPet from "./lostpets/mypetlist/mylostpetlist";



function lostlistmainpage() {
  return (
    <>
      <Header />
      <div className="Breadcrumbs">
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Reuniting', href: '/findpet' },{ title: 'FoundPetList', href: '/mypetlostpost' }]} />
      </div>
      <MyLostPostPet/>
      <Footer />
    </>
  );
}

export default lostlistmainpage;