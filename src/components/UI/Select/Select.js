import React from 'react';
import './Select.css';

export const Select = props => {
  const {
    label,
    value,
    onChange,
    options,
  } = props;

  // id selecta
  const htmlFor = `${label}-${Math.random()}`

  return (
    <div className="Select">
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {
          options.map((option, index) => {
            return (
              <option
                value={option.value}
                key={option.value + index}
              >
                {option.text}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}
