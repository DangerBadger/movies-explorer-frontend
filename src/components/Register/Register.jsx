import AuthForm from '../AuthForm/AuthForm';

function Register({
  handleRegistration,
  isSuccess,
  error,
  setError,
}) {
  return (
    <AuthForm
      isRegisterForm
      handleRegistration={handleRegistration}
      isSuccess={isSuccess}
      error={error}
      setError={setError}
    />
  );
}

export default Register;
