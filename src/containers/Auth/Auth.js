import React from 'react';
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import {Input} from '../../components/UI/Input/Input'
import axios from 'axios'


function validateEmail(email) {
  const re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
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

  // залогиниться войти в систему
  loginHandler = () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDs7PMIc1Bp2RWfMtuj9bomRxEx1IgayVA', authData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // зарегестрироваться в системе
  registerHandler = () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDs7PMIc1Bp2RWfMtuj9bomRxEx1IgayVA', authData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  submitHandler = (evt) => {
    evt.preventDefault();
  }

  validateControl(value, validationOption) {
    // если не передали объект настроек валидации validationOption, то верни true
    if (!validationOption) {
      return true;
    }

    let isValid = true;

    if (validationOption.required) {
      // если значение value не равно пустой строке, то  isValid = true
      isValid = value !== ''
    }

    if (validationOption.email) {
      // если функция с регулярным выражением вернула true по value и до этого все проверки прошли успешно, то isValid = true
      isValid = validateEmail(value) && isValid
    }

    if (validationOption.minLength) {
      // если длина value больше чем в настройках и до этого все проверки прошли успешно, то isValid = true
      isValid = value.length >= validationOption.minLength && isValid
    }

    return isValid;
  }


  onChangeHandler = (evt, controlName) => {


    // создаем копию стейта formControls
    const formControls = {...this.state.formControls}

    // создаем копию нужного контрола (инпута) (объект email или password), оператор spread для того чтобы объект control не переопределялся и был независимым
    const control = {...formControls[controlName]}

    control.value = evt.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    // обновляем локальную копию formControls по имени контрола controlName
    formControls[controlName] = control;

    let isFormValid = true;
    // получаем объект ключей объекта formControls: email и password и дальше с помощью forEach пробегаемся по каждому
    Object.keys(formControls).forEach(name => {
      // если у каждого инпута valid === true и до этого isFormValid был равен true => isFormValid = true
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls: formControls,
      isFormValid: isFormValid
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
              // блокируем кнопку если форма невалидна
              disabled={!this.state.isFormValid}
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
