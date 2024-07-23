// import React from 'react';
import './imagetext.css';
const Image = () => {
  return (
    <div className="parentContainer">
      <img
        src="/src/assets/eric-ward-ISg37AI2A-s-unsplash.jpg"
        alt="Landscape"
      />
      <div className="img-content">
        <h2>Every Pet Deserves a Loving Home. Adopt a Pet Today</h2>
        <p>
          Browse our available animals and learn more about the adoption
          process. Together, we can rescue, rehabilitate, and rehome pets in
          need. Thank you for supporting our mission to bring joy to families
          through pet adoption.
        </p>
        <div className="buttons">
          <a href="#">
            <button className="adopt">Adopt now</button>
          </a>
          <a href="#">
            <button className="rehome">Rehome Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Image;
