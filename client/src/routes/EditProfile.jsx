import React from 'react'

export default function EditProfile() {
  return (
    <main>
       <form className="edit-form" /* onSubmit={something happens here}*/>
          <input className="edit-form-item" type='text' id='first_name' name='first_name' placeholder='First Name'></input>
          <input className="edit-form-item" type='text' id='last_name' name='last_name' placeholder='Last Name'></input>
          <input className="edit-form-item" type='password' id='password' name='password' placeholder='Password'></input>
          <input className="edit-form-item" type="text" name="socials" id="socials">
            <div className="socials-list-item">
              <ul>
                <li>
                  <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='Instagram' /><i class="fa-brands fa-instagram"></i> 
                </li>
                <li>
                  <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='YouTube' /><i class="fa-brands fa-youtube"></i>
                </li>
                <li>
                  <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='TikTok' /><i class="fa-brands fa-tiktok"></i>
                </li>
                <li>
                  <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='Twitter' /><i class="fa-brands fa-twitter"></i>
                </li>
                <li>
                  <input className="edit-form-item" type="URL" id='URL' name='URL' placeholder='LinkedIn' /><i class="fa-brands fa-linkedin"></i>
                </li>
              </ul>
            </div>
          </input>
          <input className="edit-form-item" type="text" name="qualifications" id="qualifications" />
          <input className="edit-form-item" type="text" name="bio" id="bio" />
          <h6 className="upload-img">Change a Profile Picture:</h6>
          <input className='edit-form-item-img' type="file" name="image-upload" id="image-upload" />
          <button className="edit-btn-submit" type='submit' >Save Changes</button>
        </form>
      </main>
  );
}
