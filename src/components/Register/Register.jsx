import AuthForm from '../AuthForm/AuthForm';

function Register({ handleRegistration, isSuccess }) {
  return (
    <AuthForm isRegisterForm handleRegistration={handleRegistration} isSuccess={isSuccess} />
  );
}

export default Register;
