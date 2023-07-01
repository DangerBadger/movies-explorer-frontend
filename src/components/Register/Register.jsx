import AuthForm from '../AuthForm/AuthForm';

function Register({ handleRegistration, isSuccess, error }) {
  return (
    <AuthForm
      isRegisterForm
      handleRegistration={handleRegistration}
      isSuccess={isSuccess}
      error={error}
    />
  );
}

export default Register;
