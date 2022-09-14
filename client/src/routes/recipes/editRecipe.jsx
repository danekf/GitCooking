import './editRecipe.scss';

import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios'; 
import useApplicationData from '../../hooks/userHook';

export default function EditRecipe({recipe, returnToRecipe, title, submissionURL }) {  
  const { user } = useApplicationData();  

// Form submission handler for submission to server
  const [formValue, setformValue] = useState({...recipe})

  useEffect(() => {
    setformValue({
      ...formValue,
      user_id: user.id,
    })
  }, [user])

// Ingredient handler
const [newIngredient, setNewIngredient] = useState({
  ingredientQty: '',
  ingredientName: ''
})
const handleIngredient = (event) => {
  setNewIngredient({
    ...newIngredient,
    [event.target.name]: event.target.value
  });
}
const addIngredientToList = (event) => {
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

    // Eslint-disable-next-line 
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

//recipe submission
const submitRecipe = (event) => {
  event.preventDefault();
  
  // event.preventDefault();
  axios({
    method: "post",
    url: submissionURL,
    data: formValue,
    header: {"Content-Type": "multipart/form-data"},

  })
  .then ((response)=>{
    //if username not found, send error. Messages are curated by server
    if(response.data.error){
      toast.error(response.data.error);
    }
    else{
      toast.success(`Submitted ${formValue.title} sucessfully!`)
     
      setTimeout(()=>{
         window.location = `/recipes/${recipe.id}`
      }, 2000)       
    }
  })
}

  return (
    <>
    <main>
      <div className='edit-recipe-body'>
        <div className='edit-recipe-card'>
          <div>
            <ToastContainer 
              position='top-center'
              autoClose={2000}
              closeOnClick
            />
          </div>
          <h1 className='edit-recipe-title'> Edit Recipe</h1>
          <form action="" className="edit-recipe-form">
              <h6 className='edit-recipe-heading'>Recipe Title:</h6>
              <textarea className="edit-recipe-item" type="text" name="title" value={formValue.title} onChange={handleChange} />
            
              <h6 className='edit-recipe-heading'>Cooking Time:</h6>
              <textarea className="edit-recipe-item" type="number" name="cooking-time" value={formValue.estimatedTime} disabled />
              
              <h6 className='edit-recipe-heading'>Servings:</h6>
              <textarea className="edit-recipe-item" type="number" name="servings" onChange={handleChange} value={formValue.servings} />

              <h6 className='edit-recipe-heading'>Ingredients:</h6>
              <ul className='edit-added-ingredient'>
                {formValue.ingredients.map((item, index) => 
                <>
                  <li><textarea min="0" type="number" key={index} name="ingredientQty" placeholder= "Quantity" value={formValue.ingredients[index].ingredientQty} onChange={(event)=>updateRecipe(index, event, "ingredients")}/></li> 
                  <li><textarea type="text" key={index} name="ingredientName" placeholder= "Ingredient" value={formValue.ingredients[index].ingredientName} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> </li>
                  <li><p onClick={(event)=>deleteItem(index, event, "ingredients")} className="icon-replacement-colour2"> Remove {formValue.ingredients[index].ingredientName} </p></li>
                </>
                )} 
                </ul>
                <>
                  <ul className='edit-add-ingredient'>
                    <li><textarea type="number"  min="0" name="ingredientQty" placeholder='Quantity' onChange={handleIngredient} value = {newIngredient.ingredientQty}/></li>
                    <li><textarea type="text" name="ingredientName" placeholder='Ingredient' onChange={handleIngredient} value = {newIngredient.ingredientName}/></li>
                    <p className="icon-replacement" onClick={addIngredientToList}> ADD NEW INGREDIENT </p>
                  </ul>
                </>
              <h6 className='edit-recipe-heading'>Equipments Required:</h6>
              <ul className='added-ingredient'>
                {formValue.equipment.map((item, index) => 
                  <>
                    <li><textarea min="0" step="1" type="number" key={index} name="equipmentQty" placeholder= "Quantity" value={formValue.equipment[index].equipmentQty} onChange={(event)=>updateRecipe(index, event, "equipment")}/></li>
                    <li><textarea type="text" key={index} name="equipmentName" placeholder= "Equipment" value={formValue.equipment[index].equipmentName} onChange={(event)=>updateRecipe(index, event, "equipment")}/></li>
                    <li><p onClick={(event)=>deleteItem(index, event, "equipment")} className="icon-replacement"> Remove {formValue.equipment[index].equipmentName} </p> </li>
                  </>
                )}              
              </ul>
                <>
                  <ul className='edit-add-ingredient'>
                    <li><textarea type="number" name="equipmentQty" placeholder='Quantity' onChange={handleEquipment} value = {newEquipment.equipmentQty}/></li>
                    <li><textarea type="text" name="equipmentName" placeholder="Equipment" onChange={handleEquipment} value = {newEquipment.equipmentName}/></li>
                    <p className="edit-icon-replacement" onClick={addEquipmentToList}> ADD NEW EQUIPMENT </p>
                  </ul>
                </>
              <h6 className='edit-recipe-heading'>Instructions:</h6>
              <ul className='edit-added-ingredient'>
              {formValue.instructions.map((item, index) => 
                <>
                  <li><textarea className="edit-recipe-item-add-instr-add" min="0" step="0.5" type="number" key={index} name="estimatedTime" placeholder= "Time" value={formValue.instructions[index].estimatedTime} onChange={(event)=>updateRecipe(index, event, "instructions")}/></li>
                  <li><textarea className="edit-recipe-item-add-instr-add-box" type="text" key={index} name="instruction" placeholder= "Instruction" value={formValue.instructions[index].instruction} onChange={(event)=>updateRecipe(index, event, "instructions")}/></li>
                  <p onClick={(event)=>deleteItem(index, event, "instructions")} className="edit-icon-replacement"> Remove Step </p>
                  </>
                )}  
                </ul> 
              <>
                <ul className='edit-add-ingredient'>
                  <li><textarea width="5" type="number" step="0.5" min="0" name="estimatedTime" placeholder='Time' onChange={handleInstruction} value = {newInstruction.estimatedTime}/></li>
                  <li><textarea type="text" name="instruction" placeholder='Instruction' onChange={handleInstruction} value = {newInstruction.instruction}/></li>
                  <p className="edit-icon-replacement" onClick={addInstructionToList}> ADD NEW INSTRUCTION </p>
                </ul>
              </>
              <h6 className='edit-recipe-heading'>Tags:</h6>
              <div className='tags'>
              <TagsInput
                  name= 'tags'
                  value={recipeTags}
                  onChange={setRecipeTags}
                  placeHolder="enter tags"
                /> 

              </div>
              {/* <h6 className="upload-img">Upload an Image:</h6>
              <div className='file-upload'>
              <textarea className='edit-recipe-item-img' type="file" name="image-upload" />
              </div> */}
              <div className='edit-recipe-btn-container'>
                <button className='edit-btn-submit' onClick={()=>returnToRecipe()}>Cancel</button>
                <button className='edit-btn-submit' type="submit" onClick={submitRecipe}>Submit Recipe!</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
    );  
  }