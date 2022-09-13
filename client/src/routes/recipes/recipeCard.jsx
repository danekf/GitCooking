import './recipeCard_style.scss';
import { useState } from 'react';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import {useNavigate} from 'react-router-dom';

export default function RecipeCard(props) {
  const recipe = props.recipe;
  let navigate = useNavigate();

  //hover handler
  const[hover, setHover]= useState(false)

  //recipe modal

  // loop through recipe tags to print a list separated by commas
  let tags = recipe.tags;
  let tagsList = tags.join(", ")

  return (

    <div className='recipe-card-container'
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={()=>navigate("/recipes/" + recipe.id)}    
    > 
      {recipe.recipe_photos === 'No Photos yet' && <img className='image-recipe' src='/recipePhotos/Default.jpg' width= '100%'/>}
      {recipe.recipe_photos !== 'No Photos yet' && <img className="image-recipe" src= {recipe.recipe_photos} width= '100%'/>}

      {!hover && (
        <>
        <div className='top-center text-border' >
          {recipe.title}
        </div>
        <div className='bottom-right text-border' >

          {recipe.estimatedtime === 1 && 
            "Estimated time : 1 minute."
          }

          {recipe.estimatedtime > 1 && 
          `Estimated time : ${recipe.estimatedtime} minutes.`
          }
        </div>
        </>
      )}

      {hover && (
        <>
        <div className='top-center text-border' >
          {recipe.title}
        </div>
        <div className='bottom-left text-border' >
          Tags: <ul className="tag-list">{ tagsList }</ul>
        </div>
        <div className="centered text-border" >Click to see full recipe</div> 
      </>
      )}    
    </div>
  );  
}
