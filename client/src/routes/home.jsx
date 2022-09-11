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
        <h3>Spoon it
            <h5 className='home-page-button-summary'>to Favourite</h5>
        </h3>
        
        <h3>Fork it
            <h5 className='home-page-button-summary'>to Save & Edit</h5>
        </h3>

        <h3>Create it
            <h5 className='home-page-button-summary'>to Share</h5>
        </h3>
      </div>

      <div>
        <RecipeCarousel recipes={recipes}/>
      </div>
    </>
  );  
}