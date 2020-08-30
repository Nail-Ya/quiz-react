export function createControl(config) {
  return {
    ...config,
    // изначально инпут невалиден
    valid: false,
    touched: false,
    value: ''
  }
}

export function validate(value, validation = null) {
  // если не передали объект настроек валидации validationOption, то верни true
  if (!validation) {
    return true;
  }
  let isValid = true;

  if (validation.required) {
  // если значение value не равно пустой строке, то  isValid = true
  isValid = value !== ''
  }


  return isValid;


}


//сюда добавить object.keys
export function validateForm(formControls) {
  let isFormValid = true
  // если все инпуты валидны, то форма будет валидной
  for (let control in formControls) {
    isFormValid = formControls[control].valid && isFormValid
  }
  return isFormValid;

}
