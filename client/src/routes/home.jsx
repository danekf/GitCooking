import './home.scss';
import axios from 'axios';
import { useState,useEffect } from "react";
import RecipeCarousel from './recipeCarousel';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(()=>{
    axios.get(`/api/recipes`)
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
      <div className='home-page-body'>
        <h2 className='home-page-title'>Get ready to GitCooking!</h2>
      </div>
      <div>
        <RecipeCarousel recipes={recipes}/>
      </div>
    </>
  );  
}