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
import Register from './register';


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
  
  const [recipes, setRecipes] = useState([]);
  const [mode, setMode] = useState(LOADING);

  //if it is our profile, show normal view, else show public mode
  //use effect when URL in top bar changes
  useEffect(()=>{
    if (currentProfile === user.username){
      setMode(SHOW);   
    }
    else{            
      //if not users profile, get profile data
      axios({
        method: 'post',
        url: '/api/profile/username',
        data: {username: currentProfile}
      })
      .then((response)=>{        
        setProfile({...response.data[0]})
        setMode(PUBLIC);
      })
    }    
  }, [params])

  useEffect(()=>{
    let tempId = '';
    if(mode !== 'LOADING'){
      if(mode==='PUBLIC'){
        tempId = profile.id;
      }
      else{
        tempId = user.id;
      }
      axios({
        method: 'post',
        url: '/api/recipes/user',
        data: {user_id: tempId}
      })
      .then((response)=>{
        const tempArray=[]
        if(response.data.rowCount>0){
          for (let key in response.data.rows){
            tempArray.push(response.data.rows[key])
          }
          setRecipes(tempArray);
        }        
        else{
          setRecipes([]);
        }
      })
    }
    //scroll to top anytime mode changes, better user usability
    window.scroll(0,0); 
    
  }, [mode])



  // CB function sets edit profile page to false:
  const returnToProfile = () => {
    setMode(SHOW);
  }

  return (
    <>     
    <div className='my-profile-body'>
      {/* Controls whether we are showing the edit view, or the regular profile */}
      {mode === LOADING && <Register/>}
      {mode === EDIT &&<div><EditProfile user={user} returnToProfile={returnToProfile}/></div>}
      {mode === SHOW && 
        <>
          <div className="profile-card">
          <div>
            <i className="fa-regular fa-pen-to-square" onClick={() => setMode(EDIT)}>hggjgg</i>
          </div>

            <ProfilePicture profile_picture = {user.profile_picture}/>
            <Badges badges={user.badges}/>
            <h6 className='username'>@{user.username}</h6>
            <ProfileButtons user={user}/>
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
              {recipes.map((recipe) => <li className='recipe-profile-list'><RecipeCard recipe={recipe}/></li>)}
            </ul>
          </div>
        </>
      }      
      {mode === PUBLIC && 
        <>
          <div className="profile-card">
            <ProfilePicture profile_picture = {profile.profile_picture}/>
            <Badges badges={profile.badges}/>
            <h6 className='username'>@{profile.username}</h6>
            <ProfileButtons/>
            <h6 className='full-name'>{profile.first_name} {profile.last_name}</h6>
            <Socials />
            <Qualifications qualifications={profile.qualifications}/>
            <div>
              <p className="bio">Bio</p>
              <p className="bio-paragraph">{profile.bio}</p>
            </div>
          </div>
          <div>
            <div className='my-recipes-section'>
            <div className='my-recipes-card'>
            <h1 className='my-recipes-title '>{profile.username}'s Recipes</h1>
          </div>
            <ul className='recipe-profile'>
              {recipes.map((recipe) => <li className='recipe-profile-list'><RecipeCard recipe={recipe}/></li>)}
            </ul>
          </div>
          </div>
        </>
      }
      </div>
    </>
  ); 
} 