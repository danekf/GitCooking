import { Link } from "react-router-dom";
import { React, useState } from 'react';
import axios from 'axios';
import './register.scss';

export default function Register() {
  //state managed form data
  const [formValue, setformValue] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  })

  const [validationError, setvalidationError] = useState();

  //form validation prior to submission, creates an error message
  const registraterValidation = (event) => {
    event.preventDefault();
    //clear error messages prior to setting new ones.
    setvalidationError();

    //check each form field for blank before submission
    if (formValue.username === ''){
      setvalidationError('Please enter an email before submitting');
    } else if (formValue.password === ''){
      setvalidationError("Please enter a password before submission");
    }
    else {
      submitRegistration();
    }
  };

   //registration handler on button click
   const submitRegistration = (event) => {

  }

  const handleChange =(event) =>{
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
      <div className="register-body">
        <div className="register-card">
        <h1 className="register-title">Register</h1>

        <h6 className="register-to-login">Already registered?</h6>
        <Link to='/login' className="login-btn">Login</Link>

        <form className="register-form" onSubmit={registraterValidation}>
          <input className="register-form-item" type='text' id='first_name' name='first_name' placeholder='First Name' onChange={handleChange}></input>
          <input className="register-form-item" type='text' id='last_name' name='last_name' placeholder='Last Name' onChange={handleChange}></input>
          <input className="register-form-item" type='email' id='email' name='email' placeholder="Email" onChange={handleChange}></input>
          <input className="register-form-item" type='text' id='username' name='username' placeholder='Username' onChange={handleChange}></input>
          <input className="register-form-item" type='password' id='password' name='password' placeholder='Password' onChange={handleChange}></input>
          <h6 className="upload-img">Upload a Profile Picture:</h6>
          <input className='register-form-item-img' type="file" name="image-upload" id="image-upload" />
          <button className="register-btn-submit" type='submit' >Register</button>
        </form>
        <div>
          {validationError}
        </div>
        {}
        
        </div>
    </div>
  );
}