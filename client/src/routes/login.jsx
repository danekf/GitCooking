import './login.scss';
import { React, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login(event) { 

  //state managed form data
  const [formValue, setformValue] = useState({
    username: '',
    password: ''
  })

  //form validation prior to submission, creates an error message
  const loginValidation = (event) => {
    event.preventDefault();

    if (formValue.username === ''){
      toast.error('Please enter a username or email before submitting');
    }
    if (formValue.password === ''){
      toast.error('Please enter a password before submitting');
    }
    else {
      submitLogin();
    }
  };

  //login handler on button click
  const submitLogin = () => {
    axios({
      method: "post",
      url: "/api/login",
      data: formValue,
    })
    .then ((response)=>{
      //if username not found, send error. Messages are curated by server
      if(response.data.error){
        toast.error(response.data.error);
      }
      else{
        toast.success('Login sucessful...Redirecting!')
        setTimeout(()=>{
          window.location ="/";
        }, 1500)
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
          <ToastContainer 
            position='top-center'
            autoClose={1500}
            closeOnClick
          />
        </div>
      </div>
      <div className='connect-with-us-body'>
        <h3 className="home-page-connect-with-us">Connect with us!</h3>
        <div className="home-page-socials-icons">
          <i class="fa-brands fa-instagram social-icon"></i>
          <i class="fa-brands fa-tiktok social-icon"></i>
          <i class="fa-brands fa-twitter social-icon"></i>
          <i class="fa-brands fa-pinterest social-icon"></i>
        </div>
      </div>

      <div className='home-page-copyright'>?? Copyright 2022 GitCooking. All Rights Reserved</div>
    </div>
  );  
}