import React from 'react';
import { useState,useEffect } from 'react';

import './EditProfile.scss';

export default function EditProfile({returnToProfile, user}) {  
  const [newObj, setNewObj] = useState({...user})

  //qualification handler
  const [newQualification, setNewQualification] = useState('');

  const handleQualification = (event) => {
    setNewQualification(event.target.value);
  }

  const addQualification=(event)=>{
    event.preventDefault();

    setNewObj({
      ...newObj,
      qualifications: [...newObj.qualifications, newQualification]
    })

    setNewQualification('');
  }

  //handles all basic changes to components into the form for submission
  const handleChange =(event) => {
      setNewObj({
        ...newObj,
        [event.target.name]: event.target.value
      })
    };

  const submitForm = (event)=>{
    event.preventDefault();
  }

  //handle specific qualifications
  const updateQualification = (index, event)=>{
    let tempArray = [...newObj.qualifications];    
    tempArray[index]= event.target.value; 

    setNewObj({
      ...newObj,
      qualifications: tempArray
    })
  }

  const deleteQualification = (index, event)=>{
    let tempArray = [...newObj.qualifications];    
    tempArray.splice(index, 1)

    setNewObj({
      ...newObj,
      qualifications: tempArray
    })
  }



  return (
    <>
    
    <div className='edit-profile-body'>
      <div className='edit-profile-card'>
        <h1 className='edit-profile-title'>Edit Profile</h1>
        <button className="go-back-button" onClick={() => returnToProfile()}>Go Back</button>
        <form className='edit-profile-form' onSubmit={submitForm}>
          <h6>First Name</h6>
          <input className="edit-form-item" type='text' name='first_name' placeholder='First Name' value={newObj.first_name} onChange={handleChange} ></input>
          <h6>Last Name</h6>
          <input className="edit-form-item" type='text' name='last_name' placeholder='Last Name' value={newObj.last_name} onChange={handleChange}></input>
          {/* <input className="edit-form-item" type='password' name='password' placeholder='Password'></input> not updating password just yet, needs more logic*/}
          <h6>Instagram</h6>
          <input className="edit-form-item" type="URL" name='instagram' placeholder='Instagram URL' value={newObj.instagram} onChange={handleChange}/>
          <h6>Youtube</h6>
          <input className="edit-form-item" type="URL" name='youtube' placeholder='YouTube URL' value={newObj.youtube} onChange={handleChange}/>
          <h6>Tik Tok</h6>
          <input className="edit-form-item" type="URL" name='tiktok' placeholder='TikTok URL' value={newObj.tiktok} onChange={handleChange}/>
          <h6>Twitter</h6>
          <input className="edit-form-item" type="URL" name='twitter' placeholder='Twitter URL' value={newObj.twitter} onChange={handleChange}/>
          <h6>Facebook</h6>
          <input className="edit-form-item" type="URL" name='facebook' placeholder='Facebook URL' value={newObj.facebook} onChange={handleChange}/>
          <h6>LinkedIn</h6>
          <input className="edit-form-item" type="URL" name='linkedin' placeholder='LinkedIn URL' value={newObj.linkedin} onChange={handleChange}/>

          <h6>Qualifications</h6>
          {/* WHATEVER YOU DO, DO NOT DELETE THIS MAPPING BLACK MAGIC!!!! */}
          {newObj.qualifications.map((qualification, index) => 
            <>   
            <input className="edit-form-item-qualifications" type="text" key={index} name="qualification" placeholder= "Add qualification" value={newObj.qualifications[index]} 
            onChange={(event)=>updateQualification(index, event)}/> 
            <div className='delete-q'>
            <i onClick={(event)=>deleteQualification(index, event)}class="fa-solid fa-trash"></i>
            </div>
            </>

            

            
            
          )}   
          <div>
            <div className='add-q-heading'>
            <i className="fa-solid fa-plus" onClick={addQualification}></i>
            </div>
            <input className="edit-form-item-qualifications" type="text" name="qualification" placeholder='Add a qualification' onChange={handleQualification} value = {newQualification}/>
          </div>


          <h6>Bio</h6>
          <textarea className="edit-form-item-bio" type="text" name="bio" value={newObj.bio} placeholder='Bio' onChange={handleChange}/>

          <h6 className="upload-img">Change Profile Picture:</h6>
          <input className='edit-form-item-img' type="file" name="image-upload" id="image-upload" />
          <button className="edit-btn-submit" type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
  </>
  );
}
