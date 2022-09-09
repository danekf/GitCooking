import './newRecipe_style.scss'
import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';


export default function NewRecipe(props) {
const location = useLocation();

const user = location.state?.user;
const original_fork = location.state?.original_fork || 0;

  //form submission handler for submission to server
  const [formValue, setformValue] = useState({
    user_id: user.id,
    original_fork_id: 0,
    title: '',
    ingredients: [],
    equipment: [],
    instructions: [],
    tags: [],
    servings: '',
    recipe_photos: 'dummy_URL',
    estimatedTime: 0,
  })

//ingredient handler
const [newIngredient, setNewIngredient]=useState({
  ingredientQty: '',
  ingredientName: ''
})
const handleIngredient=(event)=>{
  setNewIngredient({
    ...newIngredient,
    [event.target.name]: event.target.value
  });
}
const addIngredientToList = (event) =>{
  event.preventDefault();
  setformValue({
    ...formValue,
      ingredients: [...formValue.ingredients, newIngredient]
  });
  setNewIngredient({
    ingredientQty: '',
    ingredientName: ''
  })
}

//equipment handler
  const [newEquipment, setNewEquipment]=useState({
    equipmentQty: '',
    equipmentName: ''
  })
  const handleEquipment=(event)=>{
    setNewEquipment({
      ...newEquipment,
      [event.target.name]: event.target.value
    });
  }

  const addEquipmentToList = () =>{
    setformValue({
      ...formValue,
        equipment: [...formValue.equipment, newEquipment]
    });
    setNewEquipment({
      equipmentQty: '',
      equipmentName: ''
    })
  }

  //instructions handler
  const [newInstruction, setNewInstruction]=useState({
    estimatedTime: '',
    instruction: ''
  })

  const handleInstruction=(event)=>{
    setNewInstruction({
      ...newInstruction,
      [event.target.name]: event.target.value
    });
  }
   const addInstructionToList = () =>{
    setformValue({
      ...formValue,
        instructions: [...formValue.instructions, newInstruction]
    });

    setNewInstruction({
      estimatedTime: '',
      instruction: ''
    })
  } 

  //tag handler
  const [recipeTags, setRecipeTags]=useState([]);

  useEffect(() =>{
    setformValue({
      ...formValue,
    tags: recipeTags}) 
    // eslint-disable-next-line 
  }, [recipeTags])
  


  //handles all changes to components into the form for submission
  const handleChange =(event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  //cook time handler
  useEffect(() =>{
    let time = 0;
    // eslint-disable-next-line 
    formValue.instructions.map((step) => {
      time += parseFloat(step.estimatedTime);    
    })
    //round to nearest half minute
    time = Math.round(time*2)/2;
    setformValue({
      ...formValue,
      estimatedTime: time});
  }, [formValue.instructions])

  //recipe submission
  const submitRecipe = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/recipes/new",
      data: formValue
    })
    .then ((response)=>{
      //if username not found, send error. Messages are curated by server
      if(response.data.error){
        toast.error(response.data.error);
      }
      else{
        console.log(response.data)
      }
    })
  }


  return (
    <>
      <main>
      
        <div className='create-a-new-recipe-card'>
        <div>
          <ToastContainer 
            position='top-center'
            autoClose={3000}
            closeOnClick
          />
        </div>
          <form action="">


            <h1 className='recipe-title'>Create a New Recipe</h1>
            
            <h4>Recipe Title:</h4>
            <input type="text" name="title" id="title" value={formValue.title} onChange={handleChange} />
          
            <h4>Cooking Time:</h4>
            <input className='cooking-time' type="number" name="cooking-time" value={formValue.estimatedTime} disabled />
            
            <h4>Servings:</h4>
            <input className='servings' type="number" name="servings" onChange={handleChange} value={formValue.servings} />

            <h4>Ingredients:</h4>
            <ul>
              <div className='add-item'>
                  <i class="fa-solid fa-plus" onClick={addIngredientToList}>Add Ingredient</i>
                  <input type="number" name="ingredientQty" placeholder='Enter Quantity' onChange={handleIngredient} value = {newIngredient.ingredientQty}/>
                  <input type="text" name="ingredientName" placeholder='Enter Equipment + details' onChange={handleIngredient} value = {newIngredient.ingredientName}/>
              </div>
              {formValue.ingredients.map((item) => <li>{item.ingredientQty} - {item.ingredientName} </li>)}
            </ul>

            <h4>Equipments Required:</h4>
            <ul>
              <div className='add-item'>
                <i class="fa-solid fa-plus" onClick={addEquipmentToList}>Add Equipment</i>
                <input type="number" name="equipmentQty" placeholder='Enter Quantity' onChange={handleEquipment} value = {newEquipment.equipmentQty}/>
                <input type="text" name="equipmentName" placeholder='Enter Ingredient' onChange={handleEquipment} value = {newEquipment.equipmentName}/>
              </div>
              {formValue.equipment.map((item) => <li>{item.equipmentQty} - {item.equipmentName} </li>)}
            </ul>

            <h4>Instructions:</h4>
            <ul>
            <div className='add-item'>
                <i class="fa-solid fa-plus" onClick={addInstructionToList}>Add Instruction</i>
                <input type="number" step="0.5" min="0" name="estimatedTime" placeholder='Enter Time Required (in minutes)' onChange={handleInstruction} value = {newInstruction.estimatedTime}/>
                <input type="text" name="instruction" placeholder='Enter Instruction' onChange={handleInstruction} value = {newInstruction.instruction}/>
              </div>
              {formValue.instructions.map((item) => <li>Estimated Time:{item.estimatedTime} minutes. Step:{item.instruction}</li>)}
            </ul>
            
            <h4>Tags:</h4>
            <div className='tags'>
            <TagsInput
                name= 'tags'
                value={recipeTags}
                onChange={setRecipeTags}
                placeHolder="enter tags"
              /> 
            </div>
            <h4>Upload an Image:</h4>
            <input className='recipe-btn-upload' type="file" name="image-upload" id="image-upload" />

            <button className='recipe-btn-submit' type="submit" onClick={submitRecipe}>Submit Recipe!</button>

          </form>
        </div>
      </main>
    </>
  );  
}