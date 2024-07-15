import  { useState, useEffect } from 'react';
import PropTypes from "prop-types";
// Dropdown.js


const Dropdown = ({ label, options }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
      <button onClick={handleDropdownToggle} className="dropbtn">
        {label} <span className="arrow">{showDropdown ? 'v' : '^'}</span>
      </button>
      <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
        {options.map((option, index) => (
          <a key={index} href={`#${option.toLowerCase()}`}>{option}</a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;



Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}