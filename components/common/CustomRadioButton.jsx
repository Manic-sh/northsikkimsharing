import React from 'react';
import PropTypes from 'prop-types';

const CustomRadioButton = ({ options, onChange }) => {
  return (
    <div className="middle">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={option.name}
            checked={option.checked}
            onChange={() => onChange(option.value)}
          />
          <div className={`custom-box ${option.class}`}>
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

CustomRadioButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      class: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomRadioButton;
