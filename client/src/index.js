import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './routes/home';
import Chat from './routes/chat';
import Menu from './routes/menu';
import UserProfile from './routes/userProfile';
import Login from './routes/login';
import Register from './routes/register';
import NewRecipe from './routes/recipes/newRecipe';
import Recipe from './routes/recipes/recipe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='users/:userName' element={<UserProfile />} />
        <Route path='users/:userName/:recipeId' element={<Recipe />} />
        <Route path='chat' element={<Chat />} />
        <Route path='menu' element={<Menu />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='newRecipe' element={<NewRecipe />} />
        <Route
          path='forkRecipe'
          element={
            <NewRecipe
            // ingredients={}
            // instructions={}
            // equipment={}
            //...
            />
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
