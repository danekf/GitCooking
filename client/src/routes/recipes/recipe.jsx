import './recipe_style.scss';

import CommentList from "../comments/commentList";
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect} from 'react';
import useApplicationData from '../../hooks/userHook';
import EditRecipe from './editRecipe';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from 'react-router-dom';

export default function Recipe() {
  let navigate = useNavigate();
  const params = useParams();
  const {user, setUser} = useApplicationData();
  window.scroll(0,0); 

  //recipe handler
  const recipeId = {recipeId: params.recipeId};
  const [recipe, setRecipe] = useState({
    user_id: '',
    title: '',
    ingredients: [],
    equipment: [],
    instructions: [],
    tags: [],
    
    servings: '',
    recipe_photos: 'No Photos yet',
    estimatedTime: 0,    
  });

  const [chef, setChef] = useState([]);

  const SHOW = 'SHOW'
  const EDIT = 'EDIT'
  const FORK = 'FORK'

  const [editMode, setEditMode] = useState(SHOW);


  //load recipe info whenever state changes
  useEffect(()=>{
    // Get recipe info
    axios({
      method: "post",
      url: "/api/recipes/recipeId",
      data: recipeId
    })
    .then ((response)=>{
      setRecipe(response.data[0]);
      const tempChef={userId: response.data[0].user_id};
      // Get user id that created the recipe
      axios({
        method: "post",
        url: "/api/users",
        data: tempChef
      })
      .then((response)=>{
        setChef(response.data)
      })
    })
    // Eslint-disable-next-line
  }, [editMode])

    //favourite checker on page load
    const [isFavourite, setIsFavourite] = useState(false)
    const [favourites, setFavourites] = useState();


    useEffect(()=>{
      setFavourites(user.favourite_recipes)
      
      if(user.favourite_recipes){
        user.favourite_recipes.map((index)=>{
          if(index === recipe.id){
            setIsFavourite(true);
          }
        })
      }
  
    }, [user])

  const returnToRecipe = () =>{
    window.scroll(0,0); 
    setEditMode(SHOW)
  }

  const forkRecipe = () =>{
    window.scroll(0,0); 
    setEditMode(FORK);
  }

  const toggleFavourite = () =>{
    if(!isFavourite){
      setFavourites([...favourites, recipe.id])
      axios({
        method: "post",
        url: "/api/recipes/favourite",
        data: {favourite_recipes: [...favourites, recipe.id]}
      })
      .then((response)=>{
        setIsFavourite(true)
        toast.success('Added to favourites')
      })
    }
    else if (isFavourite){
      const tempArray = [];
      //no other method was working... should be re-written with a filter or splice
      favourites.forEach((index)=>{
        if(index !== recipe.id){
          tempArray.push(index)
        }        
      })
      setFavourites(tempArray)      
      axios({
        method: "post",
        url: "/api/recipes/favourite",
        data: {favourite_recipes: tempArray}
      })
      .then((response)=>{
        setIsFavourite(false)
        toast.success('Removed from favourites')
      })     
    }
  }

  //get comments
  const [comments, setComments] = useState([]);
  

  useEffect(()=>{
  axios({
    method: 'post',
    url: '/api/comments/get',
    data: {recipeId: recipeId.recipeId}
  })
  .then((response)=>{
    setComments(response.data);
  })
},[])

  const shareRecipe = () =>{
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast.success("Link to recipe copied to clipboard.")
  }


  

  return (
    <>
    {/* Show recipe mode */}
      {editMode === SHOW && 
      <div className='recipe-body'>
        <div className='recipe-card'>
        <h1 className='recipe-title'>{recipe.title}</h1>
          <div className='recipe-icons'>
            {isFavourite && <i className="fa-solid fa-spoon icon-hover fa-padding" onClick={toggleFavourite}> Spoon Recipe </i>}
            {!isFavourite && <i className="fa-solid fa-spoon icon-hover fa-padding" onClick={toggleFavourite}> Remove Spoon </i>}           
            <i className="fa-solid fa-utensils icon-hover fa-padding" onClick={forkRecipe}> Fork Recipe </i>
            <i className="fa-solid fa-share icon-hover fa-padding" onClick={shareRecipe}> Share Recipe </i>
          </div>
            {user.id === recipe.user_id && <i className="fa-solid fa-pen-to-square icon-hover" onClick={()=>setEditMode(EDIT)}> Edit Recipe </i>}
          <div className='username-heading-body'>
          <h5 className='username-heading-recipe'>This recipe is made with love by: <span className="recipe-author-name" onClick={()=>navigate("/profile/" + chef.username)}> @{chef.username}</span></h5>
          </div>
          <img className="recipe-img" src={recipe.recipe_photos} alt="photo" width='50%' />

          <div className='recipe-stat'>
            <h6>Cook Time:</h6>
            <p>{recipe.estimatedtime} minutes</p>
            
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
            {recipe.instructions.map((item) => <li>{/*item.estimatedTime*/}{item.instruction} </li>)}
          </ul>

          <h5 className='tags-subheading'>Tags:</h5>
          <div className='tags-body'>
            <ul className='list-container'>
              {recipe.tags.map((tag) => <li className='tags'> {tag} </li>)}
            </ul>
          </div>
          

        </div>
        
        <div className='comment-list-card-in-recipe'>
          <ul className='comment-body-recipe'>
          <CommentList comments = {comments} recipeId = {recipeId.recipeId} setComments={setComments} username={user.username}/>
          </ul>
        </div>
      </div>
    }
    {/* Edit Recipe Mode */}
    {editMode === EDIT && <EditRecipe  returnToRecipe={returnToRecipe} recipe={recipe} title="Edit" submissionURL = "/api/recipes/edit" />}
    {editMode === FORK && <EditRecipe  returnToRecipe={returnToRecipe} recipe={{...recipe, original_fork_id: recipe.id}} title="Fork" submissionURL = "/api/recipes/new" />}

    <div className='connect-with-us-body'>
        <h3 className="home-page-connect-with-us">Connect with us!</h3>
        <div className="home-page-socials-icons">
          <i class="fa-brands fa-instagram social-icon"></i>
          <i class="fa-brands fa-tiktok social-icon"></i>
          <i class="fa-brands fa-twitter social-icon"></i>
          <i class="fa-brands fa-pinterest social-icon"></i>
        </div>
      </div>

      <div className='home-page-copyright'>?? Copyright 2022 GitCooking. All Rights Reserved</div>
    <ToastContainer 
      position='top-center'
      autoClose={2000}
      closeOnClick
    />

    </>
  );
}