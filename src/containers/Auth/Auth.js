import React from 'react';
import './Auth.css'
import Button from './../../components/Button/Button'
import {Input} from './../../components/Input/Input'


export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'Пароль',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
        }
      }
    }
  }
  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = (evt) => {
    evt.preventDefault();
  }

  validateControl(value, validationOption) {

  }


  onChangeHandler = (evt, controlName) => {
    console.log(controlName);

    // создаем копию стейта formControls
    const formControls = {...this.state.formControls}

    // создаем копию нужного контрола (объект email или password), оператор spread для того чтобы объект control не переопределялся и был независимым
    const control = {...formControls[controlName]}

    control.value = evt.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    // обновляем локальную копию formControls по имени контрола controlName
    formControls[controlName] = control;

    this.setState({
      formControls: formControls
    })

  }


  renderInputs() {
    const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
      // control это объект email или password, а controlName это название этого объекта (email или password)
      const control = this.state.formControls[controlName];
      return (
        <Input
           key={controlName + index}
           type={control.type}
           value={control.value}
           valid={control.valid}
           touched={control.touched}
           label={control.label}
           //  с помощью !! приводим к булевому значению объект validation
           shouldValidate={!!control.validation}
           errorMessage={control.errorMessage}
           onChange={evt => this.onChangeHandler(evt, controlName)}
        />
      )
    })
    return inputs;
  }



  render() {
    return(
      <div className="Auth">
        <div className="wrapper">
          <h1>Авторизация</h1>
          <form className="AuthForm" onSubmit={this.submitHandler}>

            {
              this.renderInputs()
            }

            <Button
              type="success"
              onClick={this.loginHandler}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
            >
              Зарегистрироваться
            </Button>




          </form>





        </div>

      </div>
    )
  }
}
