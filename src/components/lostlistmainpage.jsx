import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Alllostlist from "./lostpets/lostpetlistpage";

function lostlistmainpage() {
  return (
    <>
      <Header />
      <Alllostlist/>
      <Footer />
    </>
  );
}

export default lostlistmainpage;