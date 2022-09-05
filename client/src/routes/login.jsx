import './login.scss';
import { React, useState } from 'react';
import password_hasher_bcrypt from "../helpers/password_hasher_bcrypt";
import axios from 'axios';


export default function Login() {


  const [formValue, setformValue] = useState({
    username: '',
    password: ''
  })

  const submitLogin = (event) => {
    console.log('Attempting Login')
    //create body form data prior to submitting
    const loginData = new FormData();

    //add username to this form data
    loginData.append('username', formValue.username);

    //when we add bcrypt, we must HASH the password prior to sending it. Currently we do not hash.
    //add password to form data
    loginData.append('password_hash')

    //make request with form data
    axios({
      method: 'post',
      url: '/login',
      data: loginData
    });

  }

  const handleChange =(event) =>{
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <body>
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={submitLogin}>
        <input className="login-form-item" type='text' id='username' name='username' placeholder='username' value={formValue.username} onChange={handleChange}></input>
        <input className="login-form-item" type='password' id='password' name='password' placeholder='password' value={formValue.password} onChange={handleChange}></input>
        <button className="badge badge-primary" type='submit'>Login</button>
      </form>
    </body>

  );  
}