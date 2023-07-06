import AuthForm from '../AuthForm/AuthForm';

function Login({ handleLogin, error, setError }) {
  return (
    <AuthForm isRegisterForm={false} handleLogin={handleLogin} error={error} setError={setError} />
  );
}

export default Login;
