import { combineReducers } from 'redux';
import createReducer from './create';
import quizReducer from './quiz';
import authReducer from './auth';

// combineReducers метод для объединения редьюсеров
// quiz, create, auth - поля стора
export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
})
