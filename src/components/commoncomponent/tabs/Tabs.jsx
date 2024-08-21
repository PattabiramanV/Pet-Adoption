import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import ReviewCard from '../rating/ReviewCard'
import { Flex } from 'antd';

// Functional component that accepts a component as a prop
const TabComponent = ({hostelReviews}) => {

console.log(hostelReviews);

    return (
        <>
  <Tabs className="w-4/5 mx-auto mt-10 pb-5 min-h-50 ">
    <TabList className="flex gap-4 cursor-pointer">
      <Tab>Description</Tab>
      <Tab>Reviews</Tab>
    </TabList>

    <TabPanel className="border border-gray-400 border-opacity-25 rounded-lg ">
      
      <h2>{hostelReviews[0]?.description}</h2>
    </TabPanel>

    <TabPanel className="flex flex-wrap border border-gray-400 border-opacity-25 rounded-lg">
      {/* Render the passed component */} 
     
     {hostelReviews?.map((pet, index) => (
      <div class="w-1/2 p-4">
        <ReviewCard  pet={pet}  />
        </div>
    ))}

      {/* <ReviewCard /> */}
      {/* <h2>Any content 2</h2> */}

    </TabPanel>

  </Tabs>

    </>
);
}
export default TabComponent;
