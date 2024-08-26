



import React, { useState } from 'react';
import './style.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReviewCard from '../rating/ReviewCard';

// Functional component that accepts a component as a prop
const TabComponent = ({ hostelReviews }) => {

  console.log(hostelReviews);

  const [activeTab, setActiveTab] = useState('London');

  const handleTabClick = (city) => {
    setActiveTab(city);
  };

  return (
    <>



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
                    {hostelReviews?.map((pet, index) => (
                      <div key={index} className="w-full sm:w-1/2 p-4">
                        <ReviewCard pet={pet} />
                      </div>
                    ))}
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

    </>
  );
};

export default TabComponent;



