import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ label, options, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    if (onChange) {
      onChange(option); // Notify parent component of the selected option
    }
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
        {selectedOption || label} <span className="arrow">{showDropdown ? 'v' : '^'}</span>
      </button>
      <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
        {options.map((option, index) => (
          <a key={index} onClick={() => handleOptionClick(option)}>{option}</a>
        ))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func // Callback function to handle option changes
};

export default Dropdown;
