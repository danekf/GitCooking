import './newRecipe_style.scss'
import { React, useState } from 'react';
import axios from 'axios';


import { TagsInput } from "react-tag-input-component";



export default function NewRecipe(props) {

  //tag handler
  const [tags, setTags]=useState([]);

  //form handler for submission to server
  const [formValue, setformValue] = useState({
    id: '',
    user_id: '',
    original_fork_id: '',
    title: '',
    ingredients: [],
    equipment_dependencies: '',
    instructions: '',
    tags: '',
  })

  const handleChange =(event) =>{
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

//ingredient handler
  const [newIngredient, setNewIngredient]=useState({})
  const handleIngredient=(event)=>{
    setNewIngredient({
      ...newIngredient,
      [event.target.name]: event.target.value
    });
  }

  const addIngredientToList = () =>{
    setformValue({
      ...formValue,
        ingredients: [...formValue.ingredients, newIngredient]
    });
  }

  return (
    <>
      <main>
        <div className='create-a-new-recipe-card'>
          <form action="">

            <h1 className='recipe-title'>Create a New Recipe</h1>

            <h4>Recipe Title:</h4>
            <input type="text" name="title" id="title" value={formValue.title} onChange={handleChange}/>

            <h4>Prep Time:</h4>
            <input className='prep-time' type="text" name="prep-time" id="prep-time" />
            
            <h4>Cooking Time:</h4>
            <input className='cooking-time' type="text" name="cooking-time" id="cooking-time" />
            
            <h4>Servings:</h4>
            <input className='servings' type="text" name="servings" id="servings" />

            <h4>Ingredients:</h4>
            <ul>
              <div className='add-item'>
                <i class="fa-solid fa-plus" onClick={addIngredientToList}>Add ingredient</i>
                <input type="text" name="ingredientQty" placeholder='Enter Quantity' onChange={handleIngredient}/>
                <input type="text" name="ingredientName" placeholder='Enter Ingredient' onChange={handleIngredient}/>
              </div>
              {formValue.ingredients.map((item) => <li>{item.ingredientQty} - {item.ingredientName} </li>)}
            </ul>

            <h4>Equipments Required:</h4>
            <ul>
              <li>
                <div className='add-item'>
                  <i class="fa-solid fa-plus"></i>
                  <input type="list" name="equipments" id="equipments" />
                </div>
              </li>
            </ul>

            <h4>Instructions:</h4>
            <ul>
              <li>
                <div className='add-item'>
                  <i class="fa-solid fa-plus"></i>
                  <input type="list" name="instructions" id="instructions" />
                </div>
              </li>
            </ul>
            
            <h4>Tags:</h4>
            <div className='tags'>
              <TagsInput
                name= 'tags'
                value={tags}
                onChange={setTags}
                placeHolder="enter tags"
              /> 
            </div>
            <h4>Upload an Image:</h4>
            <input className='recipe-btn-upload' type="file" name="image-upload" id="image-upload" />

            <button className='recipe-btn-submit' type="submit">Submit Recipe!</button>
            <button className='recipe-btn-reset' type="reset">Reset Recipe Form</button>

          </form>
        </div>
      </main>
    </>
  );  
}