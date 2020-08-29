import React from 'react';
import './MenuToggle.css'

 const MenuToggle = props => {
  const classNameArray = [
    'MenuToggle',
    'fa',
  ]

  if (props.isOpen) {
    classNameArray.push('fa-times', 'open')
  } else {
    classNameArray.push('fa-bars')
  }


  return (
    <i
      className={classNameArray.join(' ')}
      onClick={props.onToggle}
    />
  )

}

export default MenuToggle;
