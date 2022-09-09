import React from 'react';

import './EditProfile.scss';

export default function EditProfile({changeStateToFalse}) {
  return (
    <>
    <div className='edit-profile-body'>
      <div className='edit-profile-card'>
        <h1 className='edit-profile-title'>Edit Profile</h1>
        <button className="go-back-button" onClick={() => changeStateToFalse()}>Go Back</button>
        <form className='edit-profile-form'>
          <input className="edit-form-item" type='text' id='first_name' name='first_name' placeholder='First Name'></input>
          <input className="edit-form-item" type='text' id='last_name' name='last_name' placeholder='Last Name'></input>
          <input className="edit-form-item" type='password' id='password' name='password' placeholder='Password'></input>
          <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='Instagram URL' /><i className="fa-brands fa-instagram"></i> 
          <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='YouTube URL' /><i className="fa-brands fa-youtube"></i>
          <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='TikTok URL' /><i className="fa-brands fa-tiktok"></i>
          <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='Twitter URL' /><i className="fa-brands fa-twitter"></i>
          <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='LinkedIn URL' /><i className="fa-brands fa-linkedin"></i>
          <input className="edit-form-item" type="text" name="qualifications" placeholder= "Qualifications" id="qualifications" />
          <input className="edit-form-item" type="text" name="bio" id="bio" placeholder='Bio'/>
          <h6 className="upload-img">Change Profile Picture:</h6>
          <input className='edit-form-item-img' type="file" name="image-upload" id="image-upload" />
          <button className="edit-btn-submit" type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
  </>
  );
}
