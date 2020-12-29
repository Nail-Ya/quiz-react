import React from 'react';
import './AnswersList.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => {
  const {
    answers,
    onAnswerClick,
    state
  } = props;

  return (
    <ul className="AnswersList">
      {answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={onAnswerClick}
            state={state && state[answer.id]}
          />
        )
      })}
    </ul>
  )
}

export default AnswersList;
