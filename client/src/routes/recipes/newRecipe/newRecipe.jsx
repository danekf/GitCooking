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
          <textarea className="new-recipe-item" type="text" name="title" value={formValue.title} onChange={handleChange} />
        
          <h6 className='new-create-heading'>Cooking Time:</h6>
          <textarea className="new-recipe-item" type="number" name="cooking-time" value={formValue.estimatedTime} disabled />
          
          <h6 className='new-create-heading'>Servings:</h6>
          <textarea className="new-recipe-item" type="number" name="servings" onChange={handleChange} value={formValue.servings} />
            {/* //////////////////////////////INGREDIENTS ////////////////////////////////////*/}
          <h6 className='new-create-heading'>Ingredients:</h6>
          <ul className='added-ingredient'>
            {formValue.ingredients.map((item, index) => 
            <>
              <li><textarea min="0" type="number" key={index} name="ingredientQty" placeholder= "Quantity" value={formValue.ingredients[index].ingredientQty} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> </li>
              <li><textarea type="text" key={index} name="ingredientName" placeholder= "Ingredient" value={formValue.ingredients[index].ingredientName} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> </li>
              <li><p onClick={(event)=>deleteItem(index, event, "ingredients")} className="icon-replacement"> REMOVE INGREDIENT </p></li>
           </>      
            )} 
            </ul>
            <>
              <ul className='add-ingredient'>
                <li><textarea type="number"  min="0"name="ingredientQty" placeholder='Quantity' onChange={handleIngredient} value = {newIngredient.ingredientQty}/></li>
                <li><textarea type="text" name="ingredientName" placeholder='Ingredient' onChange={handleIngredient} value = {newIngredient.ingredientName}/></li>
                <p onClick={addIngredientToList} className="icon-replacement"> ADD INGREDIENT </p>
              </ul>
            </>

            {/* /////////////////////////////EQUIPMENTS//////////////////////////////////////// */}
          <h6 className='new-create-heading'>Equipment Required:</h6>
          <ul className='added-ingredient'>
            {formValue.equipment.map((item, index) => 
            <>
              <li><textarea min="0" step="1" type="number" key={index} name="equipmentQty" placeholder= "Quantity" value={formValue.equipment[index].equipmentQty} onChange={(event)=>updateRecipe(index, event, "equipment")}/></li>
              <li><textarea type="text" key={index} name="equipmentName" placeholder= "Equipment" value={formValue.equipment[index].equipmentName} onChange={(event)=>updateRecipe(index, event, "equipment")}/></li>
              <li><p onClick={(event)=>deleteItem(index, event, "equipment")} className="icon-replacement"> REMOVE EQUIPMENT</p></li>              
            </>
            )}      
            </ul>        
            <>
              <ul className='add-ingredient'>
              <li><textarea type="number" name="equipmentQty" placeholder='Quantity' onChange={handleEquipment} value = {newEquipment.equipmentQty}/></li>
              <li><textarea type="text" name="equipmentName" placeholder='Equipment' onChange={handleEquipment} value = {newEquipment.equipmentName}/></li>
              <p className="icon-replacement" onClick={addEquipmentToList}> ADD EQUIPMENT</p>
              </ul>
            </>
          {/* ///////////////////////////////INSTRUCTIONS////////////////////////////////////// */}
          <h6 className='new-create-heading'>Instructions:</h6>
          <ul className='added-ingredient'>
          {formValue.instructions.map((item, index) => 
          <>
            <li><textarea min="0" step="0.5" type="number" key={index} name="estimatedTime" placeholder= "Time (minutes)" value={formValue.instructions[index].estimatedTime} onChange={(event)=>updateRecipe(index, event, "instructions")}/></li>
            <li><textarea type="text" key={index} name="instruction" placeholder= "Instruction" value={formValue.instructions[index].instruction} onChange={(event)=>updateRecipe(index, event, "instructions")}/></li>
            <li><p onClick={(event)=>deleteItem(index, event, "instructions")} className="icon-replacement"> REMOVE INSTRUCTION </p></li>
          </>
            )}   
          </ul>
          <>
            <ul className='add-ingredient'>
              <li><textarea type="number" step="0.5" min="0" name="estimatedTime" placeholder='Time (minutes)' onChange={handleInstruction} value = {newInstruction.estimatedTime}/></li>
              <li><textarea type="text" name="instruction" placeholder='Instruction' onChange={handleInstruction} value = {newInstruction.instruction}/></li>
              <p className="icon-replacement" onClick={addInstructionToList}> ADD INSTRUCTION</p>
            </ul>
            </>
              {/* ///////////////////////////TAGS////////////////////////////////////////////// */}
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
          <textarea className='new-btn-upload' type="file" name="image-upload"/>

          <button className='new-btn-submit' type="submit" onClick={submitRecipe}>Submit Recipe!</button>

        </form>
      </div>
      </div>
      <div className='connect-with-us-body'>
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