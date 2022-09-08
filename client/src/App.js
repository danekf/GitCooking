import React, { useState, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import './App.scss';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import Menu from './routes/menu';
import axios from 'axios';

function App() {
  const { modalProps, getTriggerProps } = useModal();

  const [user, setUser] = useState({user:'No User'});

  useEffect(()=>{
    axios({
      method: "get",
      url: "/api/login",
    })
    .then ((response)=>{
      setUser({...response.data});
    })

  }, [])

  return (
    <div className='App'>
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        
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
        <Link to='/'>
          <img
            src='/GitCookingLogo.png'
            width='50px'
            alt='gitCookingLogo'
            className='gitcooking-title'
          ></img>
          GitCooking
        </Link>
          
          {/* Condiditional render here for what to show */}
          {user.id ?
            // {/* Logged in stuff here */}
            // {/* Change "Create" in mobile view to "Create a new recipe" in desktop view */}
            <><Link to='/newRecipe' className='badge badge-secondary'>
              <span class='mob-view'>Create</span>
              <span class='normal-view'> a new recipe</span>
            </Link>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Small-dark-green-circle.svg/1200px-Small-dark-green-circle.svg.png'
              width='50px'
              alt='profilePic'
            ></img>
            <p>Logged in as {user.username}</p>
            </>
            // {/* Implement "click to edit" on profile pick */}
          : 
            // {/* Not logged in stuff */}
            <Link to='/register' className="badge badge-secondary">Register</Link> 
          }
          
      </header>

      <body>
        <Outlet />
      </body>

      <footer class='app-footer'>
        <nav class='app-footer-nav'>
          <li>
            <Link to='/users/:userName'>
              <i class='fa-solid fa-user app-footer-nav-list-item'></i>
            </Link>
          </li>
          {/* Add Login for conditional rendering if someone clicks on Profile in footernav & is not logged in */}
          {/* <Link to='/login'>Login</Link> */}
          <li>
            <Link to='/favourites'>
              <i class='fa-solid fa-star app-footer-nav-list-item'></i>
            </Link>
          </li>
          <li>
            <Link to='/chat'>
              <i class='fa-solid fa-comment app-footer-nav-list-item'></i>
            </Link>
          </li>
          <li {...getTriggerProps({background: '#FAF1E6'})}>
            <i id="burger-icon" class='fa-solid fa-burger app-footer-nav-list-item'></i>
          </li>
          <Modal {...modalProps}>
            <Menu />
          </Modal>
        </nav>
      </footer>
    </div>
  );
}

export default App;
