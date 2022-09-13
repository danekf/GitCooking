import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.scss';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import Menu from './routes/menu';
import HeaderDropdownMenu from "./routes/components/dropdownMenu";
import ProfilePicture from './routes/profile_components/profile_picture';
import useApplicationData from './hooks/userHook';
import {useNavigate} from 'react-router-dom';


function App() {
  let navigate = useNavigate();
  //menu handler
  const { modalProps, getTriggerProps } = useModal();
  const { user, setUser, logout } = useApplicationData();

  return (
    <html lang='en'>
      <div className='App'>
        <head>
          <meta charSet='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />

          {/* Bootstrap */}
          <link
            href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css'
            rel='stylesheet'
          />
          <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js'></script>

          {/* Font Awesome */}
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
            integrity='sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=='
            crossOrigin='anonymous'
            referrerPolicy='no-referrer'
          />
        </head>
        <header className='app-header'>
          <div className='app-header-desktop-buttons'>
            <div className='gitcooking-title-and-logo'>
              <Link to='/'>
                <img
                  src='/GitCookingLogo.png'
                  width='50px'
                  alt='gitCookingLogo'
                  className='gitcooking-title'
                ></img>
                GitCooking
              </Link>
            </div>

            <div className='app-header desktop-view-menu-buttons'>
              {/* Condiditional render here for what to show */}
              {user.id ? (
                //Logged in stuff here
                <>
                  <Link
                    to='/newRecipe'
                    state={{ user: user }}
                    className='badge badge-secondary create-new-recipe-button'
                  >
                    <span class='mob-view'>Create</span>
                    <span class='normal-view'> a new recipe</span>
                  </Link>
                  <div className='logged-in-header'>
                    {/* <div className='header-profile-picture'>
                    <ProfilePicture
                      profile_picture={user.profile_picture}
                      id='profile-pic-display-header'
                    />
                    </div> */}
                    <div className='header-name-logout'>
                      <p className='username-display'>@{user.username}</p>
                      {/*Logout can be changed to whatever, just want it to call logout when clicked*/}
                      <button
                        className='badge badge-secondary logout-button'
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                //Implement "click to edit" on profile pic
                // Not logged in stuff
                <>
                  <Link
                    to='/register'
                    className='badge badge-secondary register-user-button'
                  >
                    Register
                  </Link>
                  <div className='logged-in-header'>
                    <Link to='/login' className='badge badge-secondary'>
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <HeaderDropdownMenu user={user} />
        </header>

        <body>
          <Outlet />
          <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js'></script>
        </body>
        
      <footer class='app-footer'>
        
        <nav class='app-footer-nav'>
          <li onClick={()=>navigate("/profile/" + user.username)} >
              <i class='fa-solid fa-user app-footer-nav-list-item'></i>
          </li>
          {/* Add Login for conditional rendering if someone clicks on Profile in footernav & is not logged in */}
          {/* <Link to='/login'>Login</Link> */}
          <li>
            <Link to='/favourites' state = {{user: user}}>
              <i class='fa-solid fa-star app-footer-nav-list-item'></i>
            </Link>
          </li>
          <li>
            <Link to='/chat'>
              <i class='fa-solid fa-comment app-footer-nav-list-item'></i>
            </Link>
          </li>
          <li {...getTriggerProps({ background: '#FAF1E6' })}>
            <i
              id='burger-icon'
              class='fa-solid fa-burger app-footer-nav-list-item'
            ></i>
          </li>
          <Modal {...modalProps}>
            <Menu />
          </Modal>
        </nav>
      </footer>
    </div>
  </html>
  );
}

export default App;
