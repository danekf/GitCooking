import './newRecipe_style.scss'
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios'; 
import useApplicationData from '../../../hooks/userHook';

export default function NewRecipe(props) {  
 const { user, setUser, logout } = useApplicationData();  
const original_fork_id = props.original_fork_id || 0;

  // Form submission handler for submission to server
  const [formValue, setformValue] = useState({
    user_id: 0,
    original_fork_id: original_fork_id,
    title: '',
    ingredients: [],
    equipment: [],
    instructions: [],
    tags: [],
    servings: '',
    recipe_photos: 'dummy_URL',
    estimatedTime: 0,
  })

  useEffect(()=>{
    setformValue({
      ...formValue,
      user_id: user.id
    })
    
  }, [user])

// Ingredient handler
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

// Equipment handler
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

  // Instructions handler
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

  // Tag handler
  const [recipeTags, setRecipeTags]=useState([]);

  useEffect(() =>{
    setformValue({
      ...formValue,
    tags: recipeTags}) 
    // eslint-disable-next-line 
  }, [recipeTags])
  
  // Handles all changes to components into the form for submission
  const handleChange =(event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  
  // Handles update of created items
const updateRecipe = (index, event, name)=>{
  let tempArray = [...formValue[name]];    
  tempArray[index][event.target.name]= event.target.value; 

  setformValue({
    ...formValue,
    [name]: tempArray
  })
}

const deleteItem = (index, event, name)=>{
  let tempArray = [...formValue[name]];    
  tempArray.splice(index, 1)

  setformValue({
    ...formValue,
    [name]: tempArray
  })
}

  // Cook time handler
  useEffect(() =>{
    let time = 0;
    // Eslint-disable-next-line 
    formValue.instructions.map((step) => {
      time += parseFloat(step.estimatedTime);    
    })
    // Round to nearest half minute
    time = Math.round(time*2)/2;
    setformValue({
      ...formValue,
      estimatedTime: time});
    // Eslint-disable-next-line
  }, [formValue.instructions])

  // Recipe submission
  const submitRecipe = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/recipes/new",
      data: formValue
    })
    .then ((response)=>{
      // If username not found, send error. Messages are curated by server
      if(response.data.error){
        toast.error(response.data.error);
      }
      else{
        toast.success(`Submitted ${formValue.title} sucessfully!`)
        const recipeId = response.data[0].id; 
        setTimeout(()=>{
          window.location = `/recipes/${recipeId}`
        }, 2000)       
      }
    })
  }

  return (
    <>
    <div className='new-recipe-body'>
      <div className='create-a-new-recipe-card'>
      <div>
        <ToastContainer 
          position='top-center'
          autoClose={2000}
          closeOnClick
        />
      </div>
        <h1 className='new-recipe-title'>Create a New Recipe</h1>
          <form action="" className='new-recipe-form'>
          <h6 className='new-create-heading'>Recipe Title:</h6>
          <input className="new-recipe-item" type="text" name="title" value={formValue.title} onChange={handleChange} />
        
          <h6 className='new-create-heading'>Cooking Time:</h6>
          <input className="new-recipe-item" type="number" name="cooking-time" value={formValue.estimatedTime} disabled />
          
          <h6 className='new-create-heading'>Servings:</h6>
          <input className="new-recipe-item" type="number" name="servings" onChange={handleChange} value={formValue.servings} />

          <h6 className='new-create-heading'>Ingredients:</h6>
          <ul className='new-ingredients-container'>
            {formValue.ingredients.map((item, index) => 
            <div className='new-list-item-container'>
              <li> 
                <input className="new-item-ing-add" min="0" type="number" key={index} name="ingredientQty" placeholder= "Enter Quantity" value={formValue.ingredients[index].ingredientQty} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> 

                <input className="new-item-ing-add" type="text" key={index} name="ingredientName" placeholder= "Enter Ingredient measurement and details" value={formValue.ingredients[index].ingredientName} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> 

                <div>
                  <i onClick={(event)=>deleteItem(index, event, "ingredients")} className="fa-solid fa-trash new-trash-icon"></i>
                </div>
              </li>   
              </div>         
            )} 
            </ul>
            <div className='new-item-ing-add-ing-container'>
              <ul>
                <li><input className='new-item-ing-add-ing' type="number"  min="0"name="ingredientQty" placeholder='Enter Quantity' onChange={handleIngredient} value = {newIngredient.ingredientQty}/></li>
                <li><input className='new-item-ing-add-ing' type="text" name="ingredientName" placeholder='Enter Ingredient measurement and details' onChange={handleIngredient} value = {newIngredient.ingredientName}/></li>
                <div>
                  <i className="fa-solid fa-plus new-add-icon" onClick={addIngredientToList}></i>
                </div>
              </ul>
            </div>
          <h6 className='new-create-heading'>Equipment Required:</h6>
          <ul className='new-equipments-container'>
            {formValue.equipment.map((item, index) => 
            <div className='new-equipments-list-item-container'>
                <li> 
                  <input className="new-recipe-item-eq-add" min="0" step="1" type="number" key={index} name="equipmentQty" placeholder= "Enter Quantity" value={formValue.equipment[index].equipmentQty} onChange={(event)=>updateRecipe(index, event, "equipment")}/> 
                  <input className="new-recipe-item-eq-add" type="text" key={index} name="equipmentName" placeholder= "Enter Equipment + details" value={formValue.equipment[index].equipmentName} onChange={(event)=>updateRecipe(index, event, "equipment")}/> 
                  <div>
                    <i onClick={(event)=>deleteItem(index, event, "equipment")}class="fa-solid fa-trash"></i>
                  </div>
                </li>            
            </div>

            )}      
            </ul>        
            <div className='new-add-eq-container'>
              <ul>
              <li><input type="number" name="equipmentQty" placeholder='Enter Quantity' onChange={handleEquipment} value = {newEquipment.equipmentQty}/></li>
              <li><input type="text" name="equipmentName" placeholder='Enter Ingredient' onChange={handleEquipment} value = {newEquipment.equipmentName}/></li>
              <div>
                <i className="fa-solid fa-plus new-add-icon-eq" onClick={addEquipmentToList}>Add Equipment</i>
              </div>
              </ul>
            </div>

          <h6 className='new-create-heading'>Instructions:</h6>
          <ul className='new-instructions-container'>
          {formValue.instructions.map((item, index) => 
                <li> 
                  <input className="new-recipe-item-add-instr-add" min="0" step="0.5" type="number" key={index} name="estimatedTime" placeholder= "Enter Time Required (in minutes)" value={formValue.instructions[index].estimatedTime} onChange={(event)=>updateRecipe(index, event, "instructions")}/> 

                  <textarea className="new-recipe-item-add-inst-add-box" type="text" key={index} name="instruction" placeholder= "Enter Instruction" value={formValue.instructions[index].instruction} onChange={(event)=>updateRecipe(index, event, "instructions")}/> 

                  <div>
                    <i onClick={(event)=>deleteItem(index, event, "instructions")} className="fa-solid fa-trash new-trash-icon-instr"></i>
                  </div>
                </li>            
            )}   
          </ul>
          <div className='new-add-instr-container'>
            <ul>
              <li>
              <input className="new-recipe-item-add-instr" type="number" step="0.5" min="0" name="estimatedTime" placeholder='Enter Time Required (in minutes)' onChange={handleInstruction} value = {newInstruction.estimatedTime}/>
              </li>
              <li>
              <textarea className="new-recipe-item-add-instr-box" type="text" name="instruction" placeholder='Enter Instruction' onChange={handleInstruction} value = {newInstruction.instruction}/>
              </li>
            </ul>
            </div>
            <div>
              <i className="fa-solid fa-plus new-add-icon-instr" onClick={addInstructionToList}>Add Instruction</i>
            </div>
              
          <h6 className='new-create-heading'>Tags:</h6>
          <div className='tags'>
          <TagsInput
              name= 'tags'
              value={recipeTags}
              onChange={setRecipeTags}
              placeHolder="enter tags"
            /> 
          </div>
          <h6 className='new-create-heading'>Upload an Image:</h6>
          <input className='recipe-btn-upload' type="file" name="image-upload"/>

          <button className='recipe-btn-submit' type="submit" onClick={submitRecipe}>Submit Recipe!</button>

        </form>
      </div>
      </div>
    </>
  );  
}