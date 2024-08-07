// import React from 'react';
// import { Breadcrumb } from 'antd';

// const BreadcrumbComponent = () => (
//   <Breadcrumb>
//     <Breadcrumb.Item>Home</Breadcrumb.Item>
//     <Breadcrumb.Item>
//       <a href="/">Application Center</a>
//     </Breadcrumb.Item>
//     <Breadcrumb.Item>
//       <a href="">Application List</a>
//     </Breadcrumb.Item>
//     <Breadcrumb.Item>An Application</Breadcrumb.Item>
//   </Breadcrumb>
// );

// export default BreadcrumbComponent;



// import React from 'react';
// import { Breadcrumb } from 'antd';
// import { Link } from 'react-router-dom';
// import './breadcrumbs.css';
// const BreadcrumbComponent = ({ items }) => (
//   <Breadcrumb>
//     {items.map((item, index) => (
//       <Breadcrumb.Item key={index}  className='breadcrumb-item'>
//         {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
//         {index < items.length - 1 && ' > '}
//       </Breadcrumb.Item>
//     ))}
//   </Breadcrumb>
// );

// export default BreadcrumbComponent;

import React from 'react';
// import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './breadcrumbs.css';

const BreadcrumbComponent = ({ items }) => (
  <div className="breadcrumb">
    {items.map((item, index) => (
      <span key={index} className="breadcrumb-item">
        {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
        {index < items.length - 1 && ' > '}
      </span>
    ))}
  </div>
);

export default BreadcrumbComponent;
