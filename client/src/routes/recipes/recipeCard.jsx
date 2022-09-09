import './recipeCard_style.scss';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function RecipeCard(props) {
  const recipe = props.recipe;
  console.log('Recipe is: ', recipe);

  const instructionstep = 1;
 

  //hover handler
  const[hover, setHover]= useState(false)

  return (
  //   <div class="container">
  //     <img src="https://www.w3schools.com/howto/img_snow_wide.jpg" alt="Snow" width="100%"/>
  //     <div class="bottom-left">Bottom Left</div>
  //     <div class="top-left">Top Left</div>
  //     <div class="top-right">Top Right</div>
  //     <div class="bottom-right">Bottom Right</div>
  //     <div class="centered">Centered</div>
  // </div>



    <div className='container'
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
      <img src="https://www.w3schools.com/howto/img_snow_wide.jpg" alt="Snow" width="100%"/>
      {!hover && (
        <>
        <div className='bottom-center text-border' >
          {recipe.title}
        </div>
        <div className='bottom-right text-border' >
          Estimated time : {recipe.estimatedtime} minutes.
        </div>
        </>
      )}

      {hover && (
        <>
        <div className='bottom-center text-border' >
          {recipe.title}
        </div>
        <div className='bottom-left text-border' >
          Tags : {recipe.tags}
        </div>
        
      </>
      )}    
    </div>
  );  
}
