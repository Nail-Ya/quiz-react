import React from 'react';
import './Backdrop.css';

const Backdrop = props => {
  const {
    onClick
  } = props;

  return (
    <div
      className="Backdrop"
      onClick={onClick}
    />
  )
}

export default Backdrop;
