import React from 'react';
import './Input.css'

function isInvalid(props) {
const {valid, touched, shouldValidate} = props;
  // если не валидированный инпут, если мы его должны валидировать, если мы его уже потрогали => это значит что он уже не валидный
  return !valid && shouldValidate && touched
}


export const Input = props => {
  const inputType = props.type || 'text'

  const classNameArray = [
    'Input'
  ]
  // id инпута
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    classNameArray.push('invalid')
  }
  return (
    <div className={classNameArray.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props) && <span>{props.errorMessage || 'Введите верное значение'}</span>
      }

    </div>
  )
}
