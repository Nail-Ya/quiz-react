export function createControl(config, validationOption) {
  return {
    ...config,
    validationOption,
    // если передали в validationOption какие-то правила, то изначально инпут будет невалиден
    valid: !validationOption,
    touched: false,
    value: ''
  }
}
