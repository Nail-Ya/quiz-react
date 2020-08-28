import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => {
  //console.log(props)
  const liClassName = `AnswerItem ${props.state}`


  return (
  <li
    className={liClassName}
    onClick={() => props.onAnswerClick(props.answer.id)}
  >
    {props.answer.text}
  </li>
  )
}

export default AnswerItem;
