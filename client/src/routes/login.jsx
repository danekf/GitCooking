import './login.scss';
import { React, useState } from 'react';
import password_hasher_bcrypt from "../helpers/password_hasher_bcrypt";
import axios from 'axios';

export default function Login(event) {  

  //state managed form data
  const [formValue, setformValue] = useState({
    username: '',
    password: ''
  })

  const [validationError, setvalidationError] = useState();

  //form validation prior to submission
  const loginValidation = (event) => {
    event.preventDefault();

    if (formValue.username = ''){
      setvalidationError('Please enter an email before submitting');
    } else if (formValue.password = ''){
      setvalidationError({...validationError, "\nPlease enter a password before submission"});
    }
    else {
      submitLogin;
    }

  }

  //login handler on button click
  const submitLogin = (event) => {
   
    axios({
      method: "post",
      url: "/api/login",
      data: formValue,
    })
      .then ((response)=>{
        console.log(response);
      })

  }   

  const handleChange =(event) =>{
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className='login-body'>
      <div className='login-card'>
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={loginValidation}>
          <input className="login-form-item" type='text' id='username' name='username' placeholder='username' value={formValue.username} onChange={handleChange}/>
          <input className="login-form-item" type='password' id='password' name='password' placeholder='password' value={formValue.password} onChange={handleChange}/>
          <button className="login-btn" type='submit'>Login</button>
        </form>
        <div>
          {validationError}
        </div>
      </div>
    </div>
  );  
}