import Header from "./Siteframe/Header";
import Footer from "./Siteframe/Footer";
import Found_pets_list_card from "./foundpets/foundpetslist";
import Reuniting_pets from "./reunitingpets/reuniting";
import Lost_pets from './lostpets/lostpetslist';





function Searching_Lost_and_Found_Pets() {
  return (
    <>
      <Header />
      <Reuniting_pets />
      <Found_pets_list_card/>
      <Lost_pets/>
      <Footer />
    </>
  );
}

export default Searching_Lost_and_Found_Pets;
