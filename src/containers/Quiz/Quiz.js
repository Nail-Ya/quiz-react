import React from 'react';
import './Quiz.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz'
import axios from 'axios'
import {Loader} from './../../components/UI/Loader/Loader'
import {withRouter} from 'react-router-dom'

class Quiz extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      results: {}, // {[id]: succeess or error}
      isFinished: false,
      activeQuestion: 0,
      answerState: null, // { id: 'success' 'error ' }
      quiz: [
        {
          question: 'Какого цвета небо?',
          rightAnswerId: 3,
          id: 1,
          answers: [
            {text: 'Черный', id:1},
            {text: 'Красный', id:2},
            {text: 'Синий', id:3},
            {text: 'Желтый', id:4}
          ]
        },
        {
          question: 'Какого цвета трава?',
          rightAnswerId: 4,
          id: 2,
          answers: [
            {text: 'Черный', id:1},
            {text: 'Красный', id:2},
            {text: 'Синий', id:3},
            {text: 'Зеленый', id:4}
          ]
        }
      ]
    }
  }

  // загружаем конкретный тест по динамическому id
  componentDidMount() {
    //this.props.match.params.id - id quiz-а
    axios.get(`https://react-quiz-15b82.firebaseio.com/quizes/${this.props.match.params.id}.json`)
    .then(res => {
      const quiz = res.data;

      this.setState({
        quiz: quiz,
        loading: false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }



  onAnswerClickHandler = (answerId) => {
    // чтобы нельзя было прокликать быстро все вопросы с первым правильным ответом
    //чтобы не срабатовало два верный ответа при быстром нажаии на правильный ответ в в первом вопросе
    if (this.state.answerState) {
      // Object.keys возвращает массив ключей объекта
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return
      }
    }


    // текущий вопрос
    const question = this.state.quiz[this.state.activeQuestion]

    // результат
    const results = this.state.results


    // если ответ правильный
    if (question.rightAnswerId === answerId) {
      // если в объекте results по ключу answerId не лежит ошибка, то добавить success
      if (!results[question.id]) {
        results[question.id] = 'success'
      }



      // добавить в стейт success ответ верный
      this.setState({
        answerState: {[answerId]: 'success'},
        results: results
      })
      // задержка переключения на следующий вопрос
      const timeout = window.setTimeout(() => {
        // если вопросы закончены
        if (this.isQuizFinished()) {
          // установи стейт
          this.setState({
            isFinished: true
          })

        } else {
          // переклбчение вопроса на следующий
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        // сброс таймаута для очистки памяти
        window.clearTimeout(timeout)
      }, 1200)



      // иначе если ответ неверный
    } else {
      results[question.id] = 'error'
      // добавить в стейт error ответ неверный
      this.setState({

        answerState: {[answerId]: 'error'},
        results: results
      })
    }


  }
  // возвращает true или false  в зависимости закончились ли вопросы
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  // коллбек для кнопки повторить: обнуляем стейты
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {


    return(

      <div className="Quiz">


        <div className="QuizWrapper">
          <h1>Ответьте на вопросы</h1>
          {
            this.state.loading
            ? <Loader />
            : this.state.isFinished
                ? <FinishedQuiz
                    results={this.state.results}
                    quiz={this.state.quiz}
                    onRetry={this.retryHandler}
                  />
                : <ActiveQuiz
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion + 1}
                    state={this.state.answerState}
                  />
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Quiz);
