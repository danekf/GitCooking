import RecipeList from "./recipes/recipeList";
import './favourites.scss'

import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useState,useEffect } from "react";
import RecipeCard from "./recipes/recipeCard";

export function Favourites () {

  const location = useLocation();
  const user = location.state?.user;
  const userId = user.id


  const [recipes, setRecipes] = useState([]);

  //get users favourite recipes
  useEffect(()=>{
    axios.get(`/api/recipes/${userId}/favourites`)
    .then((response)=>{
      const tempArray=[]
      for (let key in response.data){
        tempArray.push(response.data[key])
      }
      setRecipes(tempArray);
    })
  }, [])


  return (
    <>
      <div className="favourites-body">
        <h1 className="favourites-title">Favourites</h1>
        <ul>
          {recipes.map((recipe) => <li><RecipeCard recipe={recipe}/></li>)}
        </ul>
      </div>

      
    </>
  )
}