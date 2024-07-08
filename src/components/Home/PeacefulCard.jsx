import React from 'react';
import './Section1';
import './PeacefulCard.css'

const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <div className="card-header">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
