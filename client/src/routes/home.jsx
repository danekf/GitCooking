import './home.scss';

import RecipeList from './recipes/recipeList'

export default function Home() {
  return (
    <>
      <div className='home-page-body'>
        <h2 className='home-page-title'>Get ready to GitCooking!</h2>
          <div className='grouped-recipes'>
            <h3 className='home-page-subheading'>Top 10 Recipes of the Week!</h3>
            <RecipeList/>
            <h3 className='home-page-subheading'>Popular Recipes</h3>
            <RecipeList/>
            <h3 className='home-page-subheading'>Most Spooned Recipes</h3>
            <RecipeList/>
          </div>
        </div>
    </>
  );  
}