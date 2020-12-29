import axios from 'axios';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes';

// QuizList
export function fetchQuizesActionCreator() {
  return function (dispatch) {
    dispatch(fetchQuizesStart());
    axios.get('https://react-quiz-15b82.firebaseio.com/quizes.json')
      .then(res => {
        // создаем локальный массив для тестов
        const quizes = [];
        // добавляем каждый тест в виде объекта в массив quizes
        Object.keys(res.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: `Тест № ${index + 1}`
          })
        })
        dispatch(fetchQuizesSuccess(quizes));
      })
      .catch(err => {
        dispatch(fetchQuizesError(err));
      })
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes
  }
}

export function fetchQuizesError(err) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: err
  }
}

// Quiz
export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz: quiz
  }
}

export function fetchQuizByIdActionCreator(quizId) {
  return function(dispatch) {
    dispatch(fetchQuizesStart()); // изменили стейт на loading: true
    axios.get(`https://react-quiz-15b82.firebaseio.com/quizes/${quizId}.json`)
      .then(res => {
        const quiz = res.data;
        dispatch(fetchQuizSuccess(quiz));
      })
      .catch(err => {
        dispatch(fetchQuizesError(err));
      })
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState: answerState,
    results: results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber: questionNumber
  }
}

export function quizAnswerClickActionCreator(answerId) {
  return function (dispatch, getState) {
    const state = getState().quiz;

    // чтобы нельзя было прокликать быстро все вопросы с первым правильным ответом
    // чтобы не срабатовало два верный ответа при быстром нажаии на правильный ответ в первом вопросе
    if (state.answerState) {
      // Object.keys возвращает массив ключей объекта
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }
    // текущий вопрос
    const question = state.quiz[state.activeQuestion];
    // результат
    const results = state.results;
    // если ответ правильный
    if (question.rightAnswerId === answerId) {
      // если в объекте results по ключу answerId не лежит ошибка, то добавить success
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      // добавить в стейт success ответ верный
      dispatch(quizSetState({[answerId]: 'success'}, results));
      // задержка переключения на следующий вопрос
      const timeout = window.setTimeout(() => {
        // если вопросы закончены
        if (isQuizFinished(state)) {
          // установи стейт
          dispatch(finishQuiz());
        } else {
          // переключение вопроса на следующий
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        // сброс таймаута для очистки памяти
        window.clearTimeout(timeout);
      }, 1200)
      // иначе если ответ неверный
    } else {
      results[question.id] = 'error';
      // добавить в стейт error ответ неверный
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function retryQuizActionCreator() {
  return {
    type: QUIZ_RETRY
  }
}
