import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_ERROR
} from './actionTypes';
import axios from 'axios';

export function createQuizQuestionActionCreator(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item: item
  }
}

export function finishCreateQuizActionCreator() {
  return function(dispatch, getState) {
    axios.post('https://react-quiz-15b82.firebaseio.com/quizes.json', getState().create.quiz)
      .then(() => {
        dispatch(createQuizSuccess());
      })
      .catch(err => {
        dispatch(createQuizError(err));
      })
      .finally(() => {
        dispatch(resetQuizCreation());
      })
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function createQuizSuccess() {
  return {
    type: CREATE_QUIZ_SUCCESS
  }
}

export function createQuizError(error) {
  return {
    type: CREATE_QUIZ_ERROR,
    error: error
  }
}
