import './imagetext.css';
import { Link } from 'react-router-dom';

const Image = () => {
  return (
    <div className="parentContainer">
      <img
        src="/src/assets/frame.jpg"
        alt="Landscape"
      />
      <div className="img-content">
        <h2>Every Pet Deserves a Loving Home. Adopt a Pet Today</h2>
        <p>
          Browse our available animals and learn more about the adoption
          process. Together, rehabilitate, and rehome pets in
          need. Thank you for supporting our mission to bring joy to families
          through pet adoption.
        </p>
        <div className="buttons">
          <Link to={`/adopte`} className="adopte now" >Adopt now</Link>
          <Link to={`/sale`} className="rehome now" >Rehome Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Image;
