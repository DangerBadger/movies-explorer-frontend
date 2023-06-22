import { useState } from 'react';

function useFormValidation() {
  const [valuesObj, setValuesObj] = useState({});
  const [errorMessageObj, setErrorMessageObj] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(evt) {
    const { name, value, validationMessage } = evt.target;
    setValuesObj({ ...valuesObj, [name]: value });
    setErrorMessageObj({ ...errorMessageObj, [name]: validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
  }

  function resetValidation() {
    setValuesObj({});
    setErrorMessageObj({});
    setIsValid(false);
  }

  return {
    valuesObj,
    setValuesObj,
    errorMessageObj,
    isValid,
    handleChange,
    resetValidation,
  };
}

export default useFormValidation;
