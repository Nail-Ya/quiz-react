import React from 'react';
import './FinishedQuiz.css';
import Button from './../UI/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
  const {
    results,
    quiz,
    onRetry
  } = props;

  // количество правильных ответов
  const successAnswerCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className="FinishedQuiz">
      <ul>
        {
          quiz.map((quizItem, index) => {

            const classNameArray = [
              'fa',
              results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
              results[quizItem.id]
            ]

            return (
              <li
                key={index}
              >
                <strong>{index + 1}</strong>.&nbsp;
                {quizItem.question}
                <i className={classNameArray.join(' ')} />
              </li>
            )
          })
        }
      </ul>
      <p>Правильно {successAnswerCount} из {quiz.length}</p>
      <div>
        <Button onClick={onRetry} type="primary">Повторить</Button>
        <Link to="/">
          <Button type="success">Список тестов</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;
