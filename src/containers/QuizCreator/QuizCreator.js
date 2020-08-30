import React from 'react';
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {Input} from '../../components/UI/Input/Input'
import {Select} from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from './../../form/formFramework'
import axios from 'axios'

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Вариант ответа не может быть пустым',
    id: number,
    validation: {
      required: true
    }
  })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
      validation: {
        required: true
      }
    }),

    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}


export class QuizCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: [],
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    }
  }

  submitHandler = event => {
    event.preventDefault();
  }
  // добавляем новые вопросы на страницу
  addQuestionHandler = event => {
    event.preventDefault();

    // создаем локальную купию массива quiz из стейта
    const quiz = this.state.quiz.concat()
    // index для id
    const index = quiz.length + 1

    //деструктуризация объекта this.state.formControls на составляющие
    const {question, option1, option2, option3, option4} = this.state.formControls;

    //объект каждого из вопросов и положить их в массив quiz
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    // добавляем вопрос в quiz
    quiz.push(questionItem);

    // обновляем стейт и обнуляем страницу
    this.setState({
      quiz: quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })



  }
  // отправка пост запроса на сервер с помощью библиотеки axios для добавления нового вопроса в базу данных на сервере
  createQuizHandler = (event) => {
    event.preventDefault();



    axios.post('https://react-quiz-15b82.firebaseio.com/quizes.json', this.state.quiz)
      .then(res => {

        // обновляем стейт страницы для того чтобы можно было ввести новый запрос
        this.setState({
          quiz: [],
          isFormValid: false,
          rightAnswerId: 1,
          formControls: createFormControls()
        })


      })
      .catch(err => {
        console.log(err)
      })
  }

  changeHandler = (value, controlName) => {

    // создаем копию стейта formControls
    const formControls = {...this.state.formControls}
//console.log(formControls)
    // создаем копию нужного контрола (инпута) (объект question или option1/2/3/4), оператор spread для того чтобы объект control не переопределялся и был независимым
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    // обновляем локальную копию formControls по имени контрола controlName
    formControls[controlName] = control



    this.setState({
      formControls: formControls,
      isFormValid: validateForm(formControls)
    })




  }



  renderControls() {
    // методом Object.keys получаем массив ключей объекта this.state.formControls (получаем question, option1/2/3/4) и дальше map-ом
    return Object.keys(this.state.formControls).map((controlName, index) => {
      // control это объект question или option1/2/3/4
      const control = this.state.formControls[controlName]

      return (
        <div key={index}>
          <Input

            label={control.label}
            value={control.value}
            valid={control.valid}
            //  с помощью !! приводим к булевому значению объект validation
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={evt => this.changeHandler(evt.target.value, controlName)}
          />
          { index === 0 && <hr/> }
        </div>
      )
    })
  }

  selectChangeHandler = (evt) => {
    this.setState({
      rightAnswerId: +evt.target.value
    })
  }

  render() {
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />
    return(

      <div className="QuizCreator">
        <div className="wrapper">
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>

            {
              this.renderControls()
            }

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              // если форма невалидная, то кнопка disabled
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              //disabled пока нету никаких вопросов
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>



          </form>



        </div>

      </div>
    )
  }
}
