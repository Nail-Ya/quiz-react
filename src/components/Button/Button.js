import React from 'react';
import './Button.css';

const Button = props => {
  const buttonClassName = [
    'Button',
    props.type
  ]


  return (
    <button
      onClick={props.onClick}
      className={buttonClassName.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;
