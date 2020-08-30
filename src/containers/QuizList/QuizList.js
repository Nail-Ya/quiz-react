import React from 'react';
import './QuizList.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {Loader} from './../../components/UI/Loader/Loader'
export class QuizList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizes: [],
      loading: true
    }
  }


  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink
            to={'/quiz/' + quiz.id}
          >
            {quiz.name}
          </NavLink>
        </li>
      )

    })
  }

  componentDidMount() {
    axios.get('https://react-quiz-15b82.firebaseio.com/quizes.json')
    .then(res => {


    // создаем локальный массив для тестов
    const quizes = []
    // добавляем каждый тест в виде объекта в массив quizes
    Object.keys(res.data).forEach((key, index) => {
      quizes.push({
        id: key,
        name: `Тест № ${index + 1}`
      })
    })

    // добавляем в стейт данные из массива quizes
    this.setState({
      quizes: quizes,
      loading: false
    })

    })
    .catch(err => {
    console.log(err)
    })
  }



  render() {
    return(

      <div className="QuizList">
        <div>
          <h1>Список тестов</h1>
          {
            this.state.loading
            ? <Loader />
            : <ul>
                {this.renderQuizes()}
              </ul>
          }
        </div>
      </div>
    )
  }
}
