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


  return (

    <div className='container'
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={()=>navigate("/recipes/" + recipe.id)}    
    >
      <img className="image-recipe" src="https://www.w3schools.com/howto/img_snow_wide.jpg" alt="Snow" width="100%"/>
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
        <div className="centered text-border" >Click to see full recipe</div> 


        
      </>
      )}    
    </div>
  );  
}
