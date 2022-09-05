import { Link } from "react-router-dom";
import './register.scss';

export default function Register() {
  return (
      <body>
        <h1 className="register-title">Register</h1>
        <h2 className="register-to-login">Already registered?</h2>
        <Link to='/login' className="badge badge-primary">Login</Link>
        <form>
          <input className="register-form-item" type='text' id='email' name='email' placeholder="Email"></input>
          <input className="register-form-item" type='text' id='firstname' name='first name' placeholder='First Name'></input>
          <input className="register-form-item" type='text' id='lastname' name='last name' placeholder='Last Name'></input>
          <input className="register-form-item" type='text' id='username' name='username' placeholder='Username'></input>
          <input className="register-form-item" type='password' id='password' name='password' placeholder='Password'></input>

          <label for="profile picture">Upload a photo:</label>
          <input 
            type='file' 
            id='profile picture' 
            name='profile picture' 
            placeholder='Upload Profile Picture'
            // onChange={onChange}
          ></input>
          <button className="badge badge-primary" >Register</button>
        </form>
    </body>
  );
}