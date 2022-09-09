import './recipe_style.scss';

import CommentList from "../comments/commentList";
import {useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect} from 'react';

export default function Recipe() {
  const params = useParams();

  const recipeId = {recipeId: params.recipeId};
  const [recipe, setRecipe] = useState({
    user_id: '',
    title: '',
    ingredients: [],
    equipment: [],
    instructions: [],
    tags: [],
    servings: '',
    recipe_photos: 'dummy_URL',
    estimatedTime: 0,
  });
  const [chef, setChef] = useState([]);

  useEffect(()=>{
    //get recipe info
    axios({
      method: "post",
      url: "/api/recipes/recipeId",
      data: recipeId
    })
    .then ((response)=>{
      console.log('response is: ', response.data)
      setRecipe(response.data[0]);
      const tempChef={userId: response.data[0].user_id};
      //get user id that created the recipe
      axios({
        method: "post",
        url: "/api/users",
        data: tempChef
      })
      .then((response)=>{
        setChef(response.data)
      })
    })
    // eslint-disable-next-line
  }, [])



  return (
    <>
      <div className='recipe-body'>
        <div className='recipe-card'>

          <div className='recipe-icons'>
          <i class="fa-solid fa-spoon"></i>
          <i class="fa-solid fa-utensils"></i>

          </div>

          <h1 className='recipe-title'>{recipe.title}</h1>
          
          <h5 className='username-heading'>This recipe is made with love by: <span>{chef.username}</span></h5>

          <img className="recipe-img"src="" alt="Recipe" />

          <div className='recipe-stat'>
            <h6>Cook Time:</h6>
            <p>{recipe.estimatedtime} mintues</p>
            
            <h6>Servings:</h6>
            <p>{recipe.servings}</p>
          </div>

          <h5 className='heading-lists'>Equipment Required:</h5>
          <ul className='card-body'>
            {recipe.equipment.map((item) => <li>{item.equipmentQty} - {item.equipmentName} </li>)}
          </ul>
          <h5 className='heading-lists'>Ingredients:</h5>
          <ul className='card-body'>
            {recipe.ingredients.map((item) => <li>{item.ingredientQty} - {item.ingredientName} </li>)}
          </ul>
          <h5 className='heading-lists'>Instructions:</h5>
          <ul className='card-body'>
            {recipe.instructions.map((item) => <li>{item.estimatedTime} - {item.instruction} </li>)}
          </ul>

          <h5 className='tags-subheading'>Tags:</h5>
          <ul className='card-body'>
            {recipe.tags.map((tag) => <li>{tag} </li>)}
          </ul>

        </div>
        
        <div className='comment-list-card-in-recipe'>
          <ul>
          <CommentList />
          </ul>
        </div>
      </div>
    </>
  );
}