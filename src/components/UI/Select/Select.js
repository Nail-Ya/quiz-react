import React from 'react';
import './Select.css'

export const Select = props => {
// id selecta
  const htmlFor = `${props.label}-${Math.random()}`


  return (
    <div className="Select">
      <label htmlFor={htmlFor}>{props.label}</label>
      <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      ></select>
    </div>
  )
}
