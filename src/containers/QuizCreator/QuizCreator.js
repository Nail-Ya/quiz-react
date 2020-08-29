import React from 'react';
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {Input} from '../../components/UI/Input/Input'
import {createControl} from './../../form/formFramework'

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Вопрос не может быть пустым',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),

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
      formControls: createFormControls()
    }
  }

  submitHandler = evt => {
    evt.preventDefault();
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {

  }

  changeHandler = (value, controlName) => {

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



  render() {
    return(
      <div className="QuizCreator">
        <div className="wrapper">
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>

            {
              this.renderControls()
            }

            <select></select>
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
            >
              Создать тест
            </Button>



          </form>



        </div>

      </div>
    )
  }
}
