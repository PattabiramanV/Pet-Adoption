import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Breadcrums.css';

const BreadcrumbComponent = ({ items }) => (
  <div className="Breadcrumbs">
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span
          key={index}
          className={`breadcrumb-item ${index === items.length - 1 ? 'current-page' : ''}`}
        >
          {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
          {index < items.length - 1 && (
            <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-icon" />
          )}
        </span>
      ))}
    </div>
  </div>
);

export default BreadcrumbComponent;

