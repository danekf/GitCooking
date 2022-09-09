import './userProfile.scss';

import ProfilePicture from "./profile_components/profile_picture";
import Username from "./profile_components/username";
import ProfileButtons from "./profile_components/profile_buttons";
import Badges from "./profile_components/badges";
import Qualifications from "./profile_components/qualifications";
import Socials from "./profile_components/socials";
import Bio from "./profile_components/bio";
import RecipeList from "./recipes/recipeList"
import { useState } from 'react';
import EditProfile from './EditProfile';


export default function UserProfile() {
  const [editMode, SetEditMode] = useState(false);
  const changeStateToFalse = () => {
    SetEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <div>
          <EditProfile changeStateToFalse={changeStateToFalse}/>
        </div> )
      : (
        <>
          <div className="profile-card">
          <div>
            <i className="fa-regular fa-pen-to-square" onClick={() => SetEditMode(true)}></i>
          </div>
            <ProfilePicture/>
            <Badges/>
            <Username/>
            <ProfileButtons/>
            <Socials/>
            <Qualifications/>
            <Bio/>
          </div>
          <div>
            <div className='my-recipes-card'>
            <h1 className='my-recipes-title '>My Recipes</h1>
            </div>
            <RecipeList/>
          </div>
        </>
      )} 
    </>
  );  
}