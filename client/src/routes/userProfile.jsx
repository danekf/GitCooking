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
import { useLocation } from 'react-router-dom';


export default function UserProfile() {
  const location = useLocation();
  const user = location.state?.user
  console.log('user: ', user)

  const [editMode, SetEditMode] = useState(false);
  // CB function sets edit profile page to false:
  const returnToProfile = () => {
    SetEditMode(false);
  }

  return (
    <> 
    
      {/* Controls whether we are showing the edit view, or the regular profile */}
      {editMode ? (
        <div>
          <EditProfile returnToProfile={returnToProfile}/>
        </div> )
      : (
        <>
          <div className="profile-card">

          {/* {user === user.id && <div>
            <i className="fa-regular fa-pen-to-square" onClick={() => SetEditMode(true)}></i>
          </div>} */}

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
      :
      </>
      )} 
    </>
  );  
}