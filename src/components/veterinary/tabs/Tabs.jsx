// import React from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// // import 'react-tabs/style/react-tabs.css';
// import ReviewCard from '../rating/ReviewCard'
// // import { Flex } from 'antd';

// // Functional component that accepts a component as a prop
// const TabComponent = ({hostelReviews}) => {

// console.log(hostelReviews);
// // return;
//     return (
//         <>
//   <Tabs className="w-4/5 mx-auto mt-10 pb-5 min-h-50 ">
//     <TabList className="flex gap-4 cursor-pointer text-xl p-2">
//       <Tab>Description</Tab>
//       <Tab>Reviews</Tab>
//     </TabList>

//     <TabPanel className="border border-gray-400 border-opacity-25 rounded-lg ">
      
//       <h2 className='p-[5%] leading-[30px] font-medium'>{hostelReviews[0]?.description}</h2>
//     </TabPanel>

//     <TabPanel className="flex flex-wrap border border-gray-400 border-opacity-25 rounded-lg">
//       {/* Render the passed component */} 
     
//      {hostelReviews?.map((pet, index) => (
//       <div class="w-1/2 p-4">
//         <ReviewCard  pet={pet}  />
//         </div>
//     ))}

//       {/* <ReviewCard /> */}
//       {/* <h2>Any content 2</h2> */}

//     </TabPanel>

//   </Tabs>

//     </>
// );
// }
// export default TabComponent;





import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReviewCard from '../rating/ReviewCard';

// Functional component that accepts a component as a prop
const TabComponent = ({ hostelReviews }) => {

  console.log(hostelReviews);

  return (
    <>
      <Tabs className="w-4/5 mx-auto mt-10 pb-5 min-h-50">
        <TabList className="flex gap-4 cursor-pointer text-lg p-2 border-b-2 border-gray-300">
          <Tab
            className="px-4 py-2 rounded-t-lg transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            selectedClassName="border-b-0 bg-white text-indigo-600 shadow-lg"
          >
            Description
          </Tab>
          <Tab
            className="px-4 py-2 rounded-t-lg transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            selectedClassName="border-b-0 bg-white text-indigo-600 shadow-lg"
          >
            Reviews
          </Tab>
        </TabList>

        <TabPanel className="p-6 bg-white border border-gray-300 rounded-b-lg shadow-md">
          <h2 className="leading-8 font-medium text-gray-800">
            {hostelReviews[0]?.description}
          </h2>
        </TabPanel>

        <TabPanel className="p-6 bg-white border border-gray-300 rounded-b-lg shadow-md flex flex-wrap">
          {hostelReviews?.map((pet, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <ReviewCard pet={pet} />
            </div>
          ))}
        </TabPanel>
      </Tabs>
    </>
  );
};

export default TabComponent;






// import React from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import ReviewCard from '../rating/ReviewCard';

// const TabComponent = ({ hostelReviews }) => {
//   return (
//     <>
//       <Tabs className="w-4/5 mx-auto mt-10 pb-5 min-h-50">
//         <TabList className="flex gap-4 cursor-pointer text-lg p-2 border-b-2 border-gray-300">
//           <Tab
//             className="px-4 py-2 rounded-t-lg transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             selectedClassName="border-b-0 bg-white text-indigo-600 shadow-lg"
//           >
//             Description
//           </Tab>
//           <Tab
//             className="px-4 py-2 rounded-t-lg transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             selectedClassName="border-b-0 bg-white text-indigo-600 shadow-lg"
//           >
//             Reviews
//           </Tab>
//         </TabList>

//         <TabPanel className="p-6 bg-white border border-gray-300 rounded-b-lg shadow-md">
//           <h2 className="leading-8 font-medium text-gray-800">
//             {hostelReviews[0]?.description}
//           </h2>
//         </TabPanel>

//         <TabPanel className="p-6 bg-white border border-gray-300 rounded-b-lg shadow-md flex flex-wrap">
//           {hostelReviews && hostelReviews.length > 0 ? (
//             hostelReviews.map((pet, index) => (
//               <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
//                 <ReviewCard pet={pet} />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-lg">No reviews available.</p>
//           )}
//         </TabPanel>
//       </Tabs>
//     </>
//   );
// };

// export default TabComponent;

