
import Doctorcard from "./Doctorcard/DoctorList";
// import Doctorcard from "./doctordata";
import { Link } from 'react-router-dom';

import "./doctormainpage.css"


import './doctorpage.css';

const DoctorList = () => {
  return (

  <>
 

   <div className="list-Doctor">

{/* <div className="div_add_your_doctor_profile_main"> */}
{/* <div className="div_Add-Your-Doctor-Profile"> 
     <Link to="/doctoraddform" className="Add-Your-Doctor-Profile">
      Add Your Doctor Profile
    </Link>
     </div> */}
</div>


            <Doctorcard />
    {/* </div> */}
  </>
  )
}


export default DoctorList
