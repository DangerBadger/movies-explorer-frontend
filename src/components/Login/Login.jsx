import AuthForm from '../AuthForm/AuthForm';

function Login({ handleLogin, error }) {
  return (
    <AuthForm isRegisterForm={false} handleLogin={handleLogin} error={error} />
  );
}

export default Login;
