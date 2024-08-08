

import React from 'react';
// import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './breadcrumbs.css';

const BreadcrumbComponent = ({ items }) => (
  <div className="Breadcrumbs">

  <div className="breadcrumb">
    {items.map((item, index) => (
      <span key={index} className="breadcrumb-item">
        {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
        {index < items.length - 1 && ' > '}
      </span>
    ))}
  </div>
  </div>

);

export default BreadcrumbComponent;
