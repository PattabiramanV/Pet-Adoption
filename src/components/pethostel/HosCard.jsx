import hostelImage from "../../assets/dog_hostel_img.jpg"; // Corrected: added ".jpg" file extension
import { useNavigate } from "react-router-dom";

function HostelCard({ hostel,active }){

// console.log(props);
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate("/bookHos");
    };

    return(

        <a
          className="p-6 max-w-sm border border-indigo-300 rounded-xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col pb-1"
          href=""
        >
          <img
            src={hostelImage}
            className="shadow rounded-lg overflow-hidden border"
            alt="Hostel"
          />
          <h3 className="text-start">{hostel?.name}</h3>

          <div className="mt-4 flex gap-4 items-center">
          
            <div className="flex items-center gap-1">
              <h4 className="font-bold text-xl">Location:</h4>
              <p className="text-gray-600 text-xs text-customBlue">{hostel?.location}</p>
            </div>

            <div className="flex items-center gap-1">
              <h4 className="font-bold text-xl">Contact:</h4>
              <p className="text-gray-600 text-xs mt-1 text-customBlue">{hostel?.contact}</p>
            </div>
          </div>

          <div>
            <p className="mt-2 text-gray-600">
              Create Exercises for any subject with the topics you and your students care about...
            </p>
          </div>

          <div className="mt-5 flex justify-between w-full">
            <button
              type="button"
              onClick={handleButtonClick}
              className="max-w-40 text-white bg-blue-600 font-medium text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
             Book Now
            </button>
            <button
              type="button"
              className={`max-w-40 ${active} text-white font-medium bg-blue-600 text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            >
              Message
            </button>
          </div>
            
        </a>
    )





}

export default HostelCard;