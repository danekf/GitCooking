import './login.scss';
import axios from "axios";

export default function Login() {

  function login(){
    console.log('Attempting Login');
    ///axios will get from proxy
    axios.get('/login')
      .then((data) => {
        console.log(data);
      })
      .catch(error => console.log(error));
  };

  return (
    <body>
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={login}>
        <input className="login-form-item" type='text' id='username' name='username' placeholder="username"></input>
        <input className="login-form-item" type='password' id='password' name='password' placeholder='password'></input>
        <button className="badge badge-primary" >Login</button>
      </form>
    </body>

  );  
}