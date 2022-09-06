import './login.scss';
import { React, useState } from 'react';
import axios from 'axios';

export default function Login(event) {  

  //state managed form data
  const [formValue, setformValue] = useState({
    username: '',
    password: ''
  })

  const [validationError, setvalidationError] = useState();

  //form validation prior to submission, creates an error message
  const loginValidation = (event) => {
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
      submitLogin();
    }
  };

  //login handler on button click
  const submitLogin = (event) => {
   
    axios({
      method: "post",
      url: "/api/login",
      data: formValue,
    })
    .then ((response)=>{
      //if username not found, send error. Messages are curated by server
      if(response.data.Error){
        setvalidationError(response.data.Error);
      }
      else{
        console.log(response.data)
      }
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