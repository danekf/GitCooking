import './newRecipe_style.scss'
import { React, useState } from 'react';
import axios from 'axios';

export default function NewRecipe(props) {

  const [formValue, setformValue] = useState({
    id: '',
    user_id: '',
    original_fork_id: '',
    title: '',
    ingredients: '',
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



  return (
    <>
      <main>
        <div className='create-a-new-recipe-card'>
          <form action="">

            <h1 className='recipe-title'>Create a New Recipe</h1>

            <h4>Recipe Title:</h4>
            <input type="text" name="title" id="title" value={formValue.username} onChange={handleChange}/>

            <h4>Prep Time:</h4>
            <input className='prep-time' type="text" name="prep-time" id="prep-time" />
            
            <h4>Cooking Time:</h4>
            <input className='cooking-time' type="text" name="cooking-time" id="cooking-time" />
            
            <h4>Servings:</h4>
            <input className='servings' type="text" name="servings" id="servings" />

            <h4>Ingredients:</h4>
            <ul>
              <li>
              <div className='add-item'><i class="fa-solid fa-plus"></i></div><input type="list" name="ingredients" id="ingredients" />
              </li>
            </ul>

            <h4>Equipments Required:</h4>
            <ul>
              <li>
              <div className='add-item'><i class="fa-solid fa-plus"></i></div><input type="list" name="equipments" id="equipments" />
              </li>
            </ul>

            <h4>Instructions:</h4>
            <ul>
              <li>
              <div className='add-item'><i class="fa-solid fa-plus"></i></div><input type="list" name="instructions" id="instructions" />
              </li>
            </ul>
            
            <h4>Tags:</h4>
            <input type="text" name="tags" id="tags" />
            
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