import './userProfile.scss';
import './profile_components/styles.scss';

import ProfilePicture from "./profile_components/profile_picture";
import ProfileButtons from "./profile_components/profile_buttons";
import Badges from "./profile_components/badges";
import Qualifications from "./profile_components/qualifications";
import Socials from "./profile_components/socials";
import axios from 'axios';
import { useState, useEffect } from 'react';
import RecipeCard from './recipes/recipeCard';
import EditProfile from './EditProfile';
import useApplicationData from '../hooks/userHook';
import {useParams} from "react-router-dom";


export default function UserProfile() {
  const params = useParams();
  const currentProfile = params.username;  
  const { user, setUser, logout } = useApplicationData();  
  const [profile, setProfile] = useState({
    badges: [],
    qualifications: [],
    favourite_recipes: [],
  })
  const SHOW = 'SHOW';
  const EDIT = 'EDIT';
  const PUBLIC = 'PUBLIC';
  const LOADING = 'LOADING';

  const [mode, setMode] = useState(LOADING);

  //if it is our profile, show normal view, else show public mode
  useEffect(()=>{
    if (currentProfile === user.username){
      setMode(SHOW);
    }
    else{
      setMode(PUBLIC);
      axios({
        method: 'post',
        url: '/api/profile/username',
        data: {username: currentProfile}
      })
      .then((response)=>{
        console.log(response.data)
      })
    }
  }, [user])

  // CB function sets edit profile page to false:
  const returnToProfile = () => {
    setMode(SHOW);
  }

  //get all of a users recipes
  const [recipes, setRecipes] = useState([]);
  useEffect(()=>{
    axios.get(`/api/recipes/user`)
    .then((response)=>{
      const tempArray=[]
      for (let key in response.data){
        tempArray.push(response.data[key])
      }
      setRecipes(tempArray);
    })
    // eslint-disable-next-line
  }, []) 

  return (
    <>     
      {/* Controls whether we are showing the edit view, or the regular profile */}
      {mode === LOADING && <h1 className='my-recipes-title '>Loading Profile...</h1>}
      {mode === EDIT &&<div><EditProfile user={user} returnToProfile={returnToProfile}/></div>}

      {mode === SHOW && 
        <>
          <div className="profile-card">
          <div>
            <i className="fa-regular fa-pen-to-square" onClick={() => setMode(EDIT)}></i>
          </div>

            <ProfilePicture profile_picture = {user.profile_picture}/>
            <Badges badges={user.badges}/>
            <h6 className='username'>@{user.username}</h6>
            <ProfileButtons/>
            <h6 className='full-name'>{user.first_name} {user.last_name}</h6>
            <Socials />
            <Qualifications qualifications={user.qualifications}/>
            <div>
              <p className="bio">Bio</p>
              <p className="bio-paragraph">{user.bio}</p>
            </div>
          </div>
          <div>
            <div className='my-recipes-card'>
            <h1 className='my-recipes-title '>My Recipes</h1>
          </div>
            <ul>
              {recipes.map((recipe) => <li><RecipeCard recipe={recipe}/></li>)}
            </ul>
          </div>
        </>
      }
      
      {mode === PUBLIC && 
        <>
          <div className="profile-card">
            <ProfilePicture profile_picture = {user.profile_picture}/>
            <Badges badges={user.badges}/>
            <h6 className='username'>@{user.username}</h6>
            <ProfileButtons/>
            <h6 className='full-name'>{user.first_name} {user.last_name}</h6>
            <Socials />
            <Qualifications qualifications={user.qualifications}/>
            <div>
              <p className="bio">Bio</p>
              <p className="bio-paragraph">{user.bio}</p>
            </div>
          </div>
          <div>
            <div className='my-recipes-card'>
            <h1 className='my-recipes-title '>My Recipes</h1>
          </div>
            <ul>
              {recipes.map((recipe) => <li><RecipeCard recipe={recipe}/></li>)}
            </ul>
          </div>
        </>
      }
    </>
  ); 
} 