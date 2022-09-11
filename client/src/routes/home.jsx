import './home.scss';
import SearchBar from "./components/searchBar";
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
        <h1 className='home-page-title'>Get ready to GitCooking!
          <h3 className="home-page-subtitle">Community driven recipes without the life story from the last 3 generations.</h3>
          <div className="search-bar-feature">
            <SearchBar />  
          </div>
        </h1>
      </div>

      <div className="home-page-button-write-up">
        
        <div>
          <i className='fa-solid fa-spoon'></i>
          <h3>Spoon it</h3>
          <h5 className='home-page-button-summary'>to Favourite</h5>
        </div>

        <div>
          <i className='fa-solid fa-utensils'></i>
          <h3>Fork it</h3>
            <h5 className='home-page-button-summary'>to Save & Edit</h5>
        </div>

        <div>
          <i class="fa-solid fa-share"></i>
          <h3>Create it</h3>
          <h5 className='home-page-button-summary'>to Share</h5>
        </div>

      </div>

      <div>
        <RecipeCarousel recipes={recipes}/>
      </div>
    </>
  );  
}