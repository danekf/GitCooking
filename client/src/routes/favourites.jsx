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
          {recipes.map((recipe) => <li><RecipeCard recipe={recipe}/></li>)}
        </ul>
      </div>

      
    </>
  )
}