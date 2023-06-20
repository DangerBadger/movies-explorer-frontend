import AuthForm from '../AuthForm/AuthForm';

function Register({ handleRegistration }) {
  return (
    <AuthForm isRegisterForm handleRegistration={handleRegistration} />
  );
}

export default Register;
