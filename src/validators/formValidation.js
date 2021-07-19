
function fieldValidate(key, value, errors) {
  let newErrors = errors;
  newErrors[key] = newErrors[key].validation(value);
  return newErrors;
}

function formValidate(errors, values) {
  const keys = Object.keys(errors);
  let newErrors = {};
  keys.forEach((key) => {
    newErrors[key] = errors[key].validation(values[key]);
  });
  return newErrors;
}

function formIsValid(errors) {
  const keys = Object.keys(errors);

  for (let i = 0; i < keys.length; i++) {
    if (!errors[keys[i]].valido) {
      return false;
    }
  }

  return true;
}

export {fieldValidate, formValidate, formIsValid}
