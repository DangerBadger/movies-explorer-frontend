import { useState } from 'react';

function useFormValidation() {
  const [valuesObj, setValuesObj] = useState({});
  const [errorMessageObj, setErrorMessageObj] = useState({});
  const [isValid, setIsValid] = useState(true);

  const validationSettings = {
    search: {
      validationError: 'Нужно ввести ключевое слово',
      regexp: /[\W\d\wа-я\sё]+/gi,
    },
  };

  const customValidation = (name, value) => {
    if (!validationSettings[name].regexp.test(value)) {
      setErrorMessageObj({ ...errorMessageObj, [name]: validationSettings[name].validationError });
      setIsValid(false);
    }
  };

  function handleChange(evt) {
    const { name, value, validationMessage } = evt.target;
    setValuesObj({ ...valuesObj, [name]: value });
    setErrorMessageObj({ ...errorMessageObj, [name]: validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
    if (name === 'search') {
      customValidation(name, value);
    }
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
