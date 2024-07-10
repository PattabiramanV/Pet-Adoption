import Header from "./Header_and_Footer/Header";
import Footer from "./Header_and_Footer/Footer";
import Found_pets_list_card from "./foundpets/foundpetslist";
import Reuniting_pets from "./reunitingpets/Reuniting";
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
