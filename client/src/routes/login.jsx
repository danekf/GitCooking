import './login.scss';

export default function Login() {
  return (
    <body>
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input className="login-form-item" type='text' id='username' name='username' placeholder="username"></input>
        <input className="login-form-item" type='password' id='password' name='password' placeholder='password'></input>
        <button className="badge badge-primary">Login</button>
      </form>
    </body>

  );  
}