import React from 'react';
import './Button.css';

const Button = props => {
  const {
    type,
    onClick,
    disabled,
    children
  } = props;

  const buttonClassName = [
    'Button',
    type
  ]

  return (
    <button
      onClick={onClick}
      className={buttonClassName.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
