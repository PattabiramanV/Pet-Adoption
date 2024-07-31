import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import MyLostPostPet from "./lostpets/mypetlist/mylostpetlist";

function lostlistmainpage() {
  return (
    <>
      <Header />
      <MyLostPostPet/>
      <Footer />
    </>
  );
}

export default lostlistmainpage;