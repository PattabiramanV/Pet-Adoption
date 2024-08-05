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



import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const BreadcrumbComponent = ({ items }) => (
  <Breadcrumb>
    {items.map((item, index) => (
      <Breadcrumb.Item key={index}>
        {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

export default BreadcrumbComponent;
