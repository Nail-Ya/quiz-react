import React from 'react';
import './ActiveQuiz.css'
import './ActiveQuiz';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => {
  const {
    answerNumber,
    question,
    quizLength,
    answers,
    onAnswerClick,
    state
  } = props;

  return (
    <div className="ActiveQuiz">
      <p className="Question">
        <span>
          <strong>{answerNumber}.</strong>&nbsp;
          {question}
        </span>
        <small>{answerNumber} из {quizLength}</small>
      </p>
      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        state={state}
      />
    </div>
  )
}

export default ActiveQuiz;
