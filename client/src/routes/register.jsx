import { Link } from "react-router-dom";
import './register.scss';

export default function Register() {
  return (
      <body>
        <div className="register-card">
        <h1 className="register-title">Register</h1>

        <h6 className="register-to-login">Already registered?</h6>
        <Link to='/login' className="login-btn">Login</Link>

        <form className="register-form">
          <input className="register-form-item" type='text' id='first-name' name='first name' placeholder='First Name'></input>
          <input className="register-form-item" type='text' id='last-name' name='last name' placeholder='Last Name'></input>
          <input className="register-form-item" type='email' id='email' name='email' placeholder="Email"></input>
          <input className="register-form-item" type='text' id='username' name='username' placeholder='Username'></input>
          <input className="register-form-item" type='password' id='password' name='password' placeholder='Password'></input>
          <h6 className="upload-img">Upload a Profile Picture:</h6>
          <input className='register-form-item-img' type="file" name="image-upload" id="image-upload" />
          <button className="register-btn-submit" >Register</button>
        </form>
        
        </div>
    </body>
  );
}