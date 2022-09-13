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
        <h1 className='home-page-title'>Get ready to GitCooking! </h1>
          <h5 className="home-page-subtitle">Community driven recipes without the life story from the last 3 generations.</h5>
          <div className="search-bar-feature">
            <SearchBar />  
          </div>
      </div>

      <div className="home-page-button-write-up">
        <div>
          <i className='fa-solid fa-spoon'></i>
          <h3>Spoon it</h3>
          <h5 className='home-page-button-summary'>to Favourite</h5>
        </div>
        <div className="home-page-summary-fork">
          <i className='fa-solid fa-utensils'></i>
          <h3>Fork it</h3>
            <h5 className='home-page-button-summary'>to Save & Edit</h5>
        </div>
        <div>
          <i className="fa-solid fa-share"></i>
          <h3>Create it</h3>
          <h5 className='home-page-button-summary'>to Share</h5>
        </div>
      </div>


      <div className='grouped-recipes'>
        <h3 className='home-page-subheading'>Top 10 Recipes of the Week</h3>
        <RecipeCarousel recipes={recipes}/>
        <h3 className='home-page-subheading'>Popular Recipes</h3>
        <RecipeCarousel recipes={recipes}/>
        <h3 className='home-page-subheading'>Most Spooned Recipes</h3>
        <RecipeCarousel recipes={recipes}/>
      </div>

      <div>
        <h3 className="home-page-connect-with-us">Connect with us!</h3>
        <div className="home-page-socials-icons">
          <i class="fa-brands fa-instagram social-icon"></i>
          <i class="fa-brands fa-tiktok social-icon"></i>
          <i class="fa-brands fa-twitter social-icon"></i>
          <i class="fa-brands fa-pinterest social-icon"></i>
        </div>
      </div>

      <div className='home-page-copyright'>© Copyright 2022 GitCooking. All Rights Reserved</div>
    </>
  );  
}