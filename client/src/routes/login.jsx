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

  //login handler on button click
  const submitLogin = (event) => {
    event.preventDefault();

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
    <div>
      <form className="login-form" onSubmit={submitLogin}>
        <h1 className="login-title">Login</h1>
        <input className="login-form-item" type='text' id='username' name='username' placeholder='username' value={formValue.username} onChange={handleChange}/>
        <input className="login-form-item" type='password' id='password' name='password' placeholder='password' value={formValue.password} onChange={handleChange}/>
        <button className="badge badge-primary" type='submit'>Login</button>
      </form>
    </div>

  );  
}