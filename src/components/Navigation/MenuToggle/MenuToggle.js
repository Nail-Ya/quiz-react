import React from 'react';
import './MenuToggle.css';

const MenuToggle = props => {
  const {
    isOpen,
    onToggle
  } = props;

  const classNameArray = [
    'MenuToggle',
    'fa',
  ]

  if (isOpen) {
    classNameArray.push('fa-times', 'open')
  } else {
    classNameArray.push('fa-bars')
  }

  return (
    <i
      className={classNameArray.join(' ')}
      onClick={onToggle}
    />
  )
}

export default MenuToggle;
