// import React, { useState } from 'react';

// const Tabs = () => {
//   const [activeTab, setActiveTab] = useState('London'); // Default tab

//   const openTabs = (e) => {
//     const btnTarget = e.currentTarget;
//     const country = btnTarget.dataset.country;

//     setActiveTab(country); // Update the active tab state
//   };

//   return (
//     <div className="tabs">
//       <div className="flex space-x-4">
//         <button
//           className={`tablinks px-4 py-2 rounded ${activeTab === 'London' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
//           data-country="London"
//           onClick={openTabs}
//         >
//           London
//         </button>
//         <button
//           className={`tablinks px-4 py-2 rounded ${activeTab === 'Paris' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
//           data-country="Paris"
//           onClick={openTabs}
//         >
//           Paris
//         </button>
//         <button
//           className={`tablinks px-4 py-2 rounded ${activeTab === 'Tokyo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
//           data-country="Tokyo"
//           onClick={openTabs}
//         >
//           Tokyo
//         </button>
//       </div>

//       <div className="mt-4">
//         <div id="London" className={`tabcontent ${activeTab === 'London' ? 'block' : 'hidden'}`}>
//           <h2 className="text-xl font-bold">London</h2>
//           <p>London is the capital city of England.</p>
//         </div>
//         <div id="Paris" className={`tabcontent ${activeTab === 'Paris' ? 'block' : 'hidden'}`}>
//           <h2 className="text-xl font-bold">Paris</h2>
//           <p>Paris is the capital of France.</p>
//         </div>
//         <div id="Tokyo" className={`tabcontent ${activeTab === 'Tokyo' ? 'block' : 'hidden'}`}>
//           <h2 className="text-xl font-bold">Tokyo</h2>
//           <p>Tokyo is the capital of Japan.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tabs;









// import React, { useState } from 'react';
// import './style.css';
// import ReviewCard from '../rating/ReviewCard'

// function App({hostelReviews}) {
//     console.log(hostelReviews);
// // return;
//   const [activeTab, setActiveTab] = useState('London');

//   const handleTabClick = (city) => {
//     setActiveTab(city);
//   };

//   return (
//     <div className="about">
//       {/* <a className="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank" rel="noopener noreferrer">
//         <span className="icon"></span>
//       </a>
//       <a className="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank" rel="noopener noreferrer">
//         <span className="icon"></span>
//       </a>
//       <a className="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank" rel="noopener noreferrer">
//         <span className="icon"></span>
//       </a>
//       <a className="bg_links logo"></a> */}

//       <section id="wrapper">
//         <div className="content border border-gray-400 border-opacity-25 rounded-lg">
//           {/* Tab links */}
//           <div className="tabs">
//             <button
//               className={`tablinks ${activeTab === 'London' ? 'active' : ''}`}
//               onClick={() => handleTabClick('London')}
//             >
//               <p data-title="London">Description</p>
//             </button>
//             <button
//               className={`tablinks ${activeTab === 'Paris' ? 'active' : ''}`}
//               onClick={() => handleTabClick('Paris')}
//             >
//               <p data-title="Paris">Reviews</p>
//             </button>
//             {/* <button
//               className={`tablinks ${activeTab === 'Barcelona' ? 'active' : ''}`}
//               onClick={() => handleTabClick('Barcelona')}
//             >
//               <p data-title="Barcelona">Barcelona</p>
//             </button>
//             <button
//               className={`tablinks ${activeTab === 'Madrid' ? 'active' : ''}`}
//               onClick={() => handleTabClick('Madrid')}
//             >
//               <p data-title="Madrid">Madrid</p>
//             </button> */}
//           </div>

//           {/* Tab content */}
//           <div className="wrapper_tabcontent ">
//             {activeTab === 'London' && (
//               <div id="London" className="tabcontent active ">
//                 <h3>Description</h3>
//                 <p>
//                 {hostelReviews[0]?.description}
//                   {/* London is the capital of Great Britain. It is one of the greatest cities in the world. It is an important business and financial centre. It is an intellectual centre, too. Everywhere in London, there are open spaces: Hyde Park and Regent Park are the largest. The City is the oldest part of London. */}
//                 </p>
//               </div>
//             )}

//             {activeTab === 'Paris' && (
//               <div id="Paris" className="tabcontent active flex flex-wrap ">
//                 <h3>Reviews</h3>  
//                 {/* <p>
//                   Paris is in the Paris department of the Paris-Isle-of-France region The French historic, political and economic capital, with a population of only 2.5 million is located in the northern part of France. One of the most beautiful cities in the world. Home to historical monuments such as Notre Dame, the Eiffel tower (320m), Bastille, Louvre and many more.
//                 </p> */}
//                  {hostelReviews?.map((pet, index) => (
//       <div class="w-1/2 p-4">
//         <ReviewCard  pet={pet}  />
//         </div>
//     ))}
//                 {/* <ReviewCard></ReviewCard> */}
//               </div>
//             )}

//             {activeTab === 'Barcelona' && (
//               <div id="Barcelona" className="tabcontent active">
//                 <h3>Barcelona</h3>
//                 <p>
//                   Barcelona has been an urban laboratory since the high Medieval Ages. A place of diversity, a backdrop for a multiplicity of social and cultural processes on multiple scales that reflect different ways of constructing the future, a city with a long experience of urban life and social innovations.
//                 </p>
//               </div>
//             )}

//             {activeTab === 'Madrid' && (
//               <div id="Madrid" className="tabcontent active">
//                 <h3>Madrid</h3>
//                 <p>
//                   Madrid is in the middle of Spain, in the Community of Madrid. The Community is a large area that includes the city as well as small towns and villages outside the city. 7 million people live in the Community. More than 3 million live in the city itself.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default App;




















import React, { useState } from 'react';
import './style.css';
import ReviewCard from '../rating/ReviewCard'
import ReviewForm from '../rating/Review';

function App({hostelReviews}) {
    console.log('hostelReviews',hostelReviews);
// return;
  const [activeTab, setActiveTab] = useState('London');

  const handleTabClick = (city) => {
    setActiveTab(city);
  };

  return (
   

<div className="about">
      <section id="wrapper">
        <div className="content border ">
          {/* Tab links */}
          <div className="tabs flex mb-4">
            <button
              className={`tablinks flex-1 p-2 text-center ${activeTab === 'London' ? 'active' : ''}`}
              onClick={() => handleTabClick('London')}
            >
              <p data-title="London">Description</p>
            </button>
            <button
              className={`tablinks flex-1 p-2 text-center ${activeTab === 'Paris' ? 'active' : ''}`}
              onClick={() => handleTabClick('Paris')}
            >
              <p data-title="Paris">Reviews</p>
            </button>
            {/* Uncomment and use if needed
            <button
              className={`tablinks flex-1 p-2 text-center ${activeTab === 'Barcelona' ? 'active' : ''}`}
              onClick={() => handleTabClick('Barcelona')}
            >
              <p data-title="Barcelona">Barcelona</p>
            </button>
            <button
              className={`tablinks flex-1 p-2 text-center ${activeTab === 'Madrid' ? 'active' : ''}`}
              onClick={() => handleTabClick('Madrid')}
            >
              <p data-title="Madrid">Madrid</p>
            </button>
            */}
          </div>

          {/* Tab content */}
          <div className="wrapper_tabcontent">
            {activeTab === 'London' && (
              <div id="London" className="tabcontent active">
                <h3>Description</h3>
                <p>
                  {hostelReviews[0]?.description}
                </p>
              </div>
            )}

{activeTab === 'Paris' && (
  <div id="Paris" className="tabcontent active">
    <h3>Reviews</h3>
    <div className="flex flex-wrap -m-4">
      {hostelReviews && hostelReviews.length > 0 && hostelReviews[0]?.user_rating!=null ? (
        hostelReviews.map((pet, index) => (
          <div key={index} className="w-full sm:w-1/2 p-4">
            <ReviewCard pet={pet} />
          </div>
        ))
      ) : (
        <div className="w-full p-4 text-center rounded-lg">
        <p className="text-gray-700 text-xl font-semibold mb-2">No reviews available yet</p>
        {/* <p className="text-gray-500 text-lg mb-4">
          Be the first to share your experience with this hostel!
        </p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Write a Review
        
          <ReviewForm onSubmit={onReviewSubmit} />
        </button> */}
      </div>
      )}
    </div>
  </div>
)}


            {activeTab === 'Barcelona' && (
              <div id="Barcelona" className="tabcontent active">
                <h3>Barcelona</h3>
                <p>
                  Barcelona has been an urban laboratory since the high Medieval Ages. A place of diversity, a backdrop for a multiplicity of social and cultural processes on multiple scales that reflect different ways of constructing the future, a city with a long experience of urban life and social innovations.
                </p>
              </div>
            )}

            {activeTab === 'Madrid' && (
              <div id="Madrid" className="tabcontent active">
                <h3>Madrid</h3>
                <p>
                  Madrid is in the middle of Spain, in the Community of Madrid. The Community is a large area that includes the city as well as small towns and villages outside the city. 7 million people live in the Community. More than 3 million live in the city itself.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;


