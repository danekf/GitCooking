import { Link } from "react-router-dom";
import { React, useState } from 'react';
import axios from 'axios';
import './register.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Register() {


  //state managed form data
  const [formValue, setformValue] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
  })

    //image submission
    const submitImage = (event) =>{
      event.preventDefault();
      const image = new FormData();
      image.append('myFile', formValue.profile_picture);
      axios({
        method: 'post',
        url: '/api/register/uploadfile', 
        data: image,
      })
      .then((response)=>{
        setformValue({
          ...formValue,
          profile_picture: `/avatar/${response.data.filepath.filename}`
        })
      })

    }
    
  // const [validationError, setvalidationError] = useState();

  //form validation prior to submission, creates an error message
  const registrationValidation = (event) => {
    event.preventDefault();

    if (formValue.username === ''){
      toast.error('Please enter a username before submitting');
    }
    if (formValue.password === ''){
      toast.error('Please enter a password before submitting');
    }
    if (formValue.email === ''){
      toast.error('Please enter an email before submitting');
    }
    if (formValue.first_name === ''){
      toast.error('Please enter your first name before submitting');
    }
    if (formValue.last_name === ''){
      toast.error('Please enter your last name before submitting');
    }
    else {
      submitRegistration();
    }
  };


   //registration handler on button click
   const submitRegistration = (event) => {
    // event.preventDefault();

    axios({
      method: "post",
      url: "/api/register",
      data: formValue,
      header: {"Content-Type": "multipart/form-data"},

    })
    .then ((response)=>{
      //if username not found, send error. Messages are curated by server
      if(response.data.error){
        toast.error(response.data.error);
      }
      else{
        toast.success("Registration sucessful, redirecting...")
        setTimeout(()=>{
          window.location = '/';
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

  const handleImage = (event) =>{
    setformValue({
      ...formValue,
      profile_picture: event.target.files[0]
    })
  }

  return (
    <>
      <div className="register-body">
        <div className="register-card">
        <h1 className="register-title">Register</h1>

        <h6 className="register-to-login">Already registered?</h6>
        <Link to='/login' className="login-btn">Login</Link>

        <form className="register-form" onSubmit={registrationValidation}>
          <input className="register-form-item" type='text' id='first_name' name='first_name' placeholder='First Name' onChange={handleChange}></input>
          <input className="register-form-item" type='text' id='last_name' name='last_name' placeholder='Last Name' onChange={handleChange}></input>
          <input className="register-form-item" type='email' id='email' name='email' placeholder="Email" onChange={handleChange}></input>
          <input className="register-form-item" type='text' id='username' name='username' placeholder='Username' onChange={handleChange}></input>
          <input className="register-form-item" type='password' id='password' name='password' placeholder='Password' onChange={handleChange}></input>
{/* 
          upload photo user multer
          <form method="POST" action="/profile-upload-single" enctype="multipart/form-data">
            <div>
              <h6 className="upload-img">Upload a Profile Picture:</h6>
              <input type="file" name="profile-file" required/>
            </div>
            {/* <div>
                <input type="submit" value="Upload" />
            </div> */}
          {/* </form> */}

          {/* <h6 className="upload-img">Upload a Profile Picture:</h6>
          <input className='register-form-item-img' type="file" name="image-upload" id="image-upload" /> */} 
          <button className="register-btn-submit" type='submit' >Register</button>
        </form>
        
        <img src={formValue.profile_picture} width= '50%' />

          <h6 className="register-to-login">Upload Profile Picture</h6>

          <form onSubmit={submitImage} className="register-form-item-img"> 
            <input type="file" onChange = {handleImage} name="myFile" accept='image/*' />
            <input type="submit" value="Upload file"/>
          </form> 


        <div>
          <ToastContainer 
            position='top-center'
            autoClose={1500}
            closeOnClick
          />
        </div>    
        </div><div className='connect-with-us-body'>
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
    </>
  );
}