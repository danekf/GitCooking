import './newRecipe_style.scss'
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios'; 
import useApplicationData from '../../../hooks/userHook';



export default function NewRecipe(props) {  
 
const { user, setUser, logout } = useApplicationData();  
const original_fork_id = props.original_fork_id || 0;

  //form submission handler for submission to server
  const [formValue, setformValue] = useState({
    user_id: 0,
    original_fork_id: original_fork_id,
    title: '',
    ingredients: [],
    equipment: [],
    instructions: [],
    tags: [],
    servings: '',
    recipe_photos: '',
    estimatedTime: 0,
  })

  useEffect(()=>{
    setformValue({
      ...formValue,
      user_id: user.id
    })
    
  }, [user])

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
  
  //handles update of created items
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
    // eslint-disable-next-line
  }, [formValue.instructions])

  //recipe submission
  const submitRecipe = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/recipes/new",
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
        const recipeId = response.data[0].id; 
        setTimeout(()=>{
          window.location = `/recipes/${recipeId}`
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
      
        <div className='create-a-new-recipe-card'>
        <div>
          <ToastContainer 
            position='top-center'
            autoClose={2000}
            closeOnClick
          />
        </div>
        {/* added action method, enctype */}
        {/* previous <form action=""> */}
          <form action="/new" method="post" enctype="multipart/form-data">


            <h1 className='recipe-title'>Create a New Recipe</h1>
            
            <h4>Recipe Title:</h4>
            <input type="text" name="title" id="title" value={formValue.title} onChange={handleChange} />
          
            <h4>Cooking Time:</h4>
            <input className='cooking-time' type="number" name="cooking-time" value={formValue.estimatedTime} disabled />
            
            <h4>Servings:</h4>
            <input className='servings' type="number" name="servings" onChange={handleChange} value={formValue.servings} />

            <h4>Ingredients:</h4>
            <ul>
              {formValue.ingredients.map((item, index) => 
                <li> 
                  <input className="" min="0" type="number" key={index} name="ingredientQty" placeholder= "Enter Quantity" value={formValue.ingredients[index].ingredientQty} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> 

                  <input className="" type="text" key={index} name="ingredientName" placeholder= "Enter Ingredient measurement and details" value={formValue.ingredients[index].ingredientName} onChange={(event)=>updateRecipe(index, event, "ingredients")}/> 

                  <div className='delete-ingredient'>
                    <i onClick={(event)=>deleteItem(index, event, "ingredients")}class="fa-solid fa-trash"></i>
                  </div>
                </li>            
              )} 
              <div className='add-item'>
                  <i className="fa-solid fa-plus" onClick={addIngredientToList}>Add Ingredient</i>
                  <input type="number"  min="0"name="ingredientQty" placeholder='Enter Quantity' onChange={handleIngredient} value = {newIngredient.ingredientQty}/>
                  <input type="text" name="ingredientName" placeholder='Enter Ingredient measurement and details' onChange={handleIngredient} value = {newIngredient.ingredientName}/>
              </div>
            </ul>

            <h4>Equipment Required:</h4>
            <ul>
              {formValue.equipment.map((item, index) => 
                  <li> 
                    <input className="" min="0" step="1" type="number" key={index} name="equipmentQty" placeholder= "Enter Quantity" value={formValue.equipment[index].equipmentQty} onChange={(event)=>updateRecipe(index, event, "equipment")}/> 

                    <input className="" type="text" key={index} name="equipmentName" placeholder= "Enter Equipment + details" value={formValue.equipment[index].equipmentName} onChange={(event)=>updateRecipe(index, event, "equipment")}/> 

                    <div className='delete-ingredient'>
                      <i onClick={(event)=>deleteItem(index, event, "equipment")}class="fa-solid fa-trash"></i>
                    </div>
                  </li>            
              )}              
              <div className='add-item'>
                <i className="fa-solid fa-plus plus-recipe" onClick={addEquipmentToList}>Add Equipment</i>
                <input type="number" name="equipmentQty" placeholder='Enter Quantity' onChange={handleEquipment} value = {newEquipment.equipmentQty}/>
                <input type="text" name="equipmentName" placeholder='Enter Ingredient' onChange={handleEquipment} value = {newEquipment.equipmentName}/>
              </div>
            </ul>

            <h4>Instructions:</h4>
            <ul>
            {formValue.instructions.map((item, index) => 
                  <li> 
                    <input className="" min="0" step="0.5" type="number" key={index} name="estimatedTime" placeholder= "Enter Time Required (in minutes)" value={formValue.instructions[index].estimatedTime} onChange={(event)=>updateRecipe(index, event, "instructions")}/> 

                    <input className="" type="text" key={index} name="instruction" placeholder= "Enter Instruction" value={formValue.instructions[index].instruction} onChange={(event)=>updateRecipe(index, event, "instructions")}/> 

                    <div className='delete-ingredient'>
                      <i onClick={(event)=>deleteItem(index, event, "instructions")}class="fa-solid fa-trash"></i>
                    </div>
                  </li>            
              )}   
            <div className='add-item'>
                <i className="fa-solid fa-plus" onClick={addInstructionToList}>Add Instruction</i>
                <input type="number" step="0.5" min="0" name="estimatedTime" placeholder='Enter Time Required (in minutes)' onChange={handleInstruction} value = {newInstruction.estimatedTime}/>
                <input type="text" name="instruction" placeholder='Enter Instruction' onChange={handleInstruction} value = {newInstruction.instruction}/>
              </div>
        
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
            <button className='recipe-btn-submit' type="submit" onClick={submitRecipe}>Submit Recipe!</button>
            </form>


            <form action="/api/recipes/uploadfile" enctype="multipart/form-data" method="POST"> 
              <input type="file" name="myFile" accept='image/*' />
              <input type="submit" value="Upload a file"/>
            </form>
            {/* <form action='/api/recipes/uploadfile' encenctype="multipart/form-data" method="POST">    
              <div>
                <h4>Upload an Image:</h4>
                <input type="file" name="myImage" accept="image/*" />
                <button className='recipe-btn-submit' type="submit" value="Upload Photo">Submit Photo</button>
              </div>
            </form> */}
        </div>
      </main>
    </>
  );  
}