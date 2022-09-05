import './login.scss';

export default function Login() {
  return (
    <body>
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input type='text' id='username' name='username' placeholder="username"></input>
        <input type='password' id='password' name='password' placeholder='password'></input>
        <button>Login</button>
      </form>
    </body>

  );  
}