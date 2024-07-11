import  { useState } from 'react';
import Dropdown from './Dropdown'; 
import CardView from '../../../components/Pets/Card/Card'
import './sideBar.css'
const SideBar = () => {
  const [rangeValue, setRangeValue] = useState(0);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const breedOptions = ['Labrador', 'Poodle', 'Bulldog', 'Beagle'];
  const colorOptions = ['Black', 'White', 'Brown', 'Golden'];
  const ageOptions = ['Puppy', 'Adult', 'Senior'];

  return (
    <div className="filter-filterpet"> 
    
     <div className="filterSearch">
          <div className="filter">
         <p>Filters</p>
      </div>
      <div className="filter_image">
        <div className="dog_image">
          <img src="/src/assets/Find_dog_filter.png" alt="Dog Filter" />
        </div>
        <div className="cat_image">
          <img src="/src/assets/Find_cat_filter.png" alt="Cat Filter" />
        </div>
      </div>
      <div className="filterLocation">
        <p>Location</p>
        <div className="locationData">
          <p className="code">city or zip</p>
          <p className="address">Ave 11th FI, New York</p>
        </div>
      </div>
      <div className="currentl">
        <div className="map">
          <img src="/src/assets/near_me.png" alt="Near Me" />
        </div>
        <div className="ltext">
          <p>Use current location</p>
        </div>
      </div>
      <div className="search">
        <div className="priceRange">
          <div className="slidecontainer">
            <input
              name="range"
              type="range"
              min="0"
              max="100000"
              value={rangeValue}
              className="slider"
              id="myRange"
              onChange={handleRangeChange}
            />
          </div>
          <p className="rangePrice">Price: {rangeValue}</p>
        </div>
        <div className="size">
          <div className="ss">
            <img src="/src/assets/Ssize.png" alt="Small Size" />
          </div>
          <div className="ms">
            <img src="/src/assets/Msize.png" alt="Medium Size" />
          </div>
          <div className="ls">
            <img src="/src/assets/Lsize.png" alt="Large Size" />
          </div>
        </div>
        <div className="dropdownSelect">
          <div className="breed">
              <Dropdown label="Breed Types" options={breedOptions} />       
          </div>
          <div className="color">
            <Dropdown label="Color" options={colorOptions} />          
          </div>
          <div className="age">
            <Dropdown label="Age" options={ageOptions} />
          </div>
          
           <div className="apply">
             <button>Apply your Filter</button>
           </div>
        </div>
      </div>
    </div>
    <div className="list-pet">
         <CardView />
    </div>
 

   </div>

  );
};

export default SideBar;
