import hostelImage from "../../assets/dog_hostel_img.jpg"; // Corrected: added ".jpg" file extension
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { IoLocationOutline } from "react-icons/io5";

function HostelCard({ hostel, active }) {
  // console.log(props);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/bookHos");
  };

  return (
    <a
      className="p-6 max-w-sm border border-indigo-300 rounded-md hover:shadow-xl hover:shadow-indigo-50 flex flex-col pb-1"
      href="#"
    >
      <img
        src={hostelImage}
        className="shadow rounded-lg overflow-hidden border"
        alt="Hostel"
      />
      <h3 className="text-2xl text-customPurple ">{hostel?.name}</h3>
      <div className="flex items-center gap-1">
        {/* <h4 className="font-bold text-xl">Location:</h4> */}
        <p>
          <IoLocationOutline />
        </p>
        <p className="text-gray-600 text-customBlue text-1xl">
          {hostel?.location}
        </p>
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <div className="w-1/4  flex items-center justify-between gap-1">
          <h4 className="font-bold text-xl">Since:</h4>
          <p className="text-gray-600 text-xs mt-1 text-customBlue">1980</p>
        </div>

        <div className=" w-3/4  flex items-center gap-1 justify-end">
          <h4 className="font-bold text-xl">Contact:</h4>
          <p className="text-gray-600 text-xs mt-1 text-customBlue">
            {hostel?.contact}
          </p>
        </div>
      </div>

      <div>
        <p className="mt-2 text-gray-600">
          Create Exercises for any subject with the topics you and your students
          care about...
        </p>
      </div>

      <div className="w-90 mt-5 flex justify-between w-full">
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-1/2 max-w-40 border border-customPurple rounded-md text-lightPurpule font-medium text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Book Now
        </button>
        <button
          type="button"
          className={`w-1/2 max-w-40 ${active} border border-customPurple rounded-md font-medium text-lightPurpule text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
        >
          Message
        </button>
      </div>
  
    </a>
  );
}

export default HostelCard;
