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

//image submission
const submitImage = (event) =>{
  event.preventDefault();
  const image = new FormData();
  image.append('myFile', formValue.recipe_photos);
  axios({
    method: 'post',
    url: '/api/recipes/uploadfile', 
    data: image,
    header: {"Content-Type": "multipart/form-data"}
  })
  .then((response)=>{
    setformValue({
      ...formValue,
      recipe_photos: `/recipePhotos/${response.data.filepath.filename}`
    })
  })
}

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

const handleImage = (event) =>{
  setformValue({
    ...formValue,
    recipe_photos: event.target.files[0]
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
              <input className="edit-recipe-item" type="text" name="title" value={formValue.title} onChange={handleChange} />
            
              <h6 className='edit-recipe-heading'>Cooking Time:</h6>
              <input className="edit-recipe-item" type="number" name="cooking-time" value={formValue.estimatedTime} disabled />
              
              <h6 className='edit-recipe-heading'>Servings:</h6>
              <input className="edit-recipe-item" type="number" name="servings" onChange={handleChange} value={formValue.servings} />

              <h6 className='edit-recipe-heading'>Ingredients:</h6>
              <ul className='ingredients-container'>
                {formValue.ingredients.map((item, index) => 
                <div className='ingredients-list-item-container'>
                  <li> 
                    <input className="edit-recipe-item-add" min="0" type="number" key={index} name="ingredientQty" placeholder= "Enter Quantity" value={formValue.ingredients[index].ingredientQty} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> 

                    <input className="edit-recipe-item-add" type="text" key={index} name="ingredientName" placeholder= "Enter Ingredient" value={formValue.ingredients[index].ingredientName} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> 

                    <div>
                      <i onClick={(event)=>deleteItem(index, event, "ingredients")} className="fa-solid fa-trash trash-icon"></i>
                    </div>
                  </li>            
                </div>
                )} 
                </ul>
                <div className='add-ing-container'>
                  <ul>
                    <li><input className="edit-recipe-item-add-ing" type="number"  min="0" name="ingredientQty" placeholder='Enter Quantity' onChange={handleIngredient} value = {newIngredient.ingredientQty}/></li>
                    <li><input className="edit-recipe-item-add-ing" type="text" name="ingredientName" placeholder='Enter Ingredient' onChange={handleIngredient} value = {newIngredient.ingredientName}/></li>
                    <div>
                      <i className="fa-solid fa-plus add-icon-ing" onClick={addIngredientToList}>Click to add Ingredient</i>
                    </div>
                  </ul>
                </div>
              <h6 className='edit-recipe-heading'>Equipments Required:</h6>
              <ul className='equipments-container'>
                {formValue.equipment.map((item, index) => 
                  <div className='equipments-list-item-container'>
                    <li> 
                      <input className="edit-recipe-item-add-eq-add" min="0" step="1" type="number" key={index} name="equipmentQty" placeholder= "Enter Quantity" value={formValue.equipment[index].equipmentQty} onChange={(event)=>updateRecipe(index, event, "equipment")}/> 

                      <input className="edit-recipe-item-add-eq-add" type="text" key={index} name="equipmentName" placeholder= "Enter Equipment and Details" value={formValue.equipment[index].equipmentName} onChange={(event)=>updateRecipe(index, event, "equipment")}/> 

                      <div>
                        <i onClick={(event)=>deleteItem(index, event, "equipment")} className="fa-solid fa-trash trash-icon-eq"></i>
                      </div>
                    </li>            
                  </div>
                )}              
              </ul>
                <div className='add-eq-container'>
                  <ul>
                    <li><input className="edit-recipe-item-add-eq" type="number" name="equipmentQty" placeholder='Enter Quantity' onChange={handleEquipment} value = {newEquipment.equipmentQty}/></li>
                    <li><input className="edit-recipe-item-add-eq" type="text" name="equipmentName" placeholder="Enter Equipment and Details" onChange={handleEquipment} value = {newEquipment.equipmentName}/></li>
                    <div>
                      <i className="fa-solid fa-plus add-icon-eq" onClick={addEquipmentToList}>Click to add Equipment</i>
                    </div>
                  </ul>
                </div>
              <h6 className='edit-recipe-heading'>Instructions:</h6>
              <ul className='instructions-container'>
              {formValue.instructions.map((item, index) => 
                <div className='instructions-list-item-container'>
                  <li> 
                    <input className="edit-recipe-item-add-instr-add" min="0" step="0.5" type="number" key={index} name="estimatedTime" placeholder= "Enter Time Required (in minutes)" value={formValue.instructions[index].estimatedTime} onChange={(event)=>updateRecipe(index, event, "instructions")}/> 

                    <textarea className="edit-recipe-item-add-instr-add-box" type="text" key={index} name="instruction" placeholder= "Enter Instruction" value={formValue.instructions[index].instruction} onChange={(event)=>updateRecipe(index, event, "instructions")}/> 

                      <div>
                        <i onClick={(event)=>deleteItem(index, event, "instructions")}class="fa-solid fa-trash trash-icon-instr"></i>
                      </div>
                    </li>            
                </div>
              )}  
              </ul> 
              <div className='add-instr-container'>
                <ul>
                  <li><input className="edit-recipe-item-add-instr" width="5" type="number" step="0.5" min="0" name="estimatedTime" placeholder='Enter Time Required (in minutes)' onChange={handleInstruction} value = {newInstruction.estimatedTime}/></li>
                  <li><textarea className="edit-recipe-item-add-instr-box" type="text" name="instruction" placeholder='Enter Instruction' onChange={handleInstruction} value = {newInstruction.instruction}/></li>
                </ul>
              </div>
              <div>
                <i className="fa-solid fa-plus add-icon-instr" onClick={addInstructionToList}>Click to add Instruction</i>
              </div>              
              <h6 className='edit-recipe-heading'>Tags:</h6>
              <div className='tags'>
              <TagsInput
                  name= 'tags'
                  value={recipeTags}
                  onChange={setRecipeTags}
                  placeHolder="enter tags"
                /> 

              </div>
              <div className='recipe-btn-container'>
                <button className='recipe-btn-submit' type="submit" onClick={submitRecipe}>Submit Recipe!</button>
                <button className='recipe-btn-submit' onClick={()=>returnToRecipe()}>Cancel</button>
              </div>       
     
          </form>

            <h4 className="upload-img">Update Image:</h4>
            <img src={formValue.recipe_photos} width= '30%' />
            
            <form onSubmit={submitImage}> 
              <input type="file" onChange = {handleImage} name="myFile" accept='image/*' />
              <input type="submit" value="Upload file"/>
            </form>  
          </div>
        </div>
      </main>
    </>
    );  
  }