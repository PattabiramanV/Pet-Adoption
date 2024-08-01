import Section from "./Home/Section";
import Header from "./Siteframe/Header";
import Petcard from "./Home/pet card/PetList";
// import Section1 from "./Home/Section1";
import Footer from "./Siteframe/Footer";
import PeacefulCoexistence from './Home/PeacefulCoexistence';
// import Login from "./Login";

function Home() {
  return (
    <>
      <Header />
      <Section />
      <PeacefulCoexistence />

      <Petcard />
      {/* <Section1 /> */}
      <Footer />
      {/* <Login /> */}
    </>
  );
}

export default Home;
