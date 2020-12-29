import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => {
  const {
    state,
    onAnswerClick,
    answer,
  } = props;

  const liClassName = `AnswerItem ${state}`;

  return (
    <li
      className={liClassName}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </li>
  )
}

export default AnswerItem;
