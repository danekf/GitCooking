import './favourites.scss'
import axios from 'axios';
import { useState,useEffect } from "react";

import RecipeCard from "./recipes/recipeCard";

export function Favourites () {


  const [recipes, setRecipes] = useState([]);

  //get users favourite recipes
  useEffect(()=>{
    axios.get(`/api/recipes/favourites`)
    .then((response)=>{
      const tempArray=[]
      for (let key in response.data){
        tempArray.push(response.data[key])
      }
      setRecipes(tempArray);
    })
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="favourites-body">
        <h1 className="favourites-title">Favourites</h1>
        <ul className='recipe-list-fave-container'>
          {recipes.map((recipe) => <li className='container-fave'><RecipeCard recipe={recipe}/></li>)}
        </ul>
        <div className='connect-with-us-body'>
        <h3 className="home-page-connect-with-us">Connect with us!</h3>
        <div className="home-page-socials-icons">
          <i class="fa-brands fa-instagram social-icon"></i>
          <i class="fa-brands fa-tiktok social-icon"></i>
          <i class="fa-brands fa-twitter social-icon"></i>
          <i class="fa-brands fa-pinterest social-icon"></i>
        </div>
      </div>

      <div className='home-page-copyright'>© Copyright 2022 GitCooking. All Rights Reserved</div>
      </div>

      
    </>
  )
}