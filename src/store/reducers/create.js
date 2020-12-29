import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_ERROR
} from './../actions/actionTypes';

const initialState = {
  quiz: []
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        // чтобы не мутировал state, создаем новый массив, разворачиваем ...имеющийся массив quiz и добавляем элемент item из action
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        // обнуляем массив quiz
        quiz: []
      }
      case CREATE_QUIZ_SUCCESS:
        return {
          ...state
        }
      case CREATE_QUIZ_ERROR:
        return {
          ...state,
          error: action.error
        }
    default:
      return state
  }
}
