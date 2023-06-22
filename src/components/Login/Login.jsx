import AuthForm from '../AuthForm/AuthForm';

function Login({ handleLogin }) {
  return (
    <AuthForm isRegisterForm={false} handleLogin={handleLogin} />
  );
}

export default Login;
