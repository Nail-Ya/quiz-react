import React from 'react';
import './Quiz.css';
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz';
import { Loader } from './../../components/UI/Loader/Loader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizByIdActionCreator, quizAnswerClickActionCreator, retryQuizActionCreator } from './../../store/actions/quiz';

class Quiz extends React.Component {

  // загружаем конкретный тест по динамическому id
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id); //this.props.match.params.id - id quiz-а в ссылке
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return(
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>Ответьте на вопросы</h1>
          {
            this.props.loading || !this.props.quiz
            ? <Loader />
            : this.props.isFinished
                ? <FinishedQuiz
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.retryQuiz}
                  />
                : <ActiveQuiz
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    question={this.props.quiz[this.props.activeQuestion].question}
                    onAnswerClick={this.props.quizAnswerClick}
                    quizLength={this.props.quiz.length}
                    answerNumber={this.props.activeQuestion + 1}
                    state={this.props.answerState}
                  />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results, // {[id]: succeess or error}
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, // { id: 'success' 'error ' } правильный ответ или неправильный ответ
    quiz: state.quiz.quiz, // объект вопроса
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizByIdActionCreator(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClickActionCreator(answerId)),
    retryQuiz: () => dispatch(retryQuizActionCreator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));
