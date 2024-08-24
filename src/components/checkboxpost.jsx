import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Checkboxpost from "./lostpets/mypetlist/checkboxlostpet";
import BreadcrumbComponent from '../components/commoncomponent/Breadcrumb';


function checkboxpetpost() {
  return (
    <>
      <Header />
      <BreadcrumbComponent items={[{ title: 'Home', href: '/' }, { title: 'Find Pet', href: '/findpet' },{ title: 'Lost Post Pet List', href: '/lostpetlisting' },{ title: 'Lost Pet Detail', href: '/petdetails' }]} />
      <Checkboxpost/>
      <Footer />
    </>
  );
}

export default checkboxpetpost;