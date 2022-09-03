import { Link } from "react-router-dom";
import './userProfile.scss';

import Badges from "./profile_components/badges";
import Bio from "./profile_components/bio";
import MessageButton from "./profile_components/messageButton";
import ProfilePicture from "./profile_components/profilePicture";
import Qualification from "./profile_components/qualification";
import Socials from "./profile_components/socials";
import Username from "./profile_components/username";
import RecipeList from './recipes/recipeList'


export default function UserProfile() {
  // const profileData = getProfileData();
  return (
    <>
    <ProfilePicture/>
    <Username/>
    <MessageButton/>
    <Badges/>
    <Bio/>
    <Qualification/>
    <Socials/>


    
    <Link to='/users/:userName/:recipeId'>TEMPORARY LINK TO A RECIPE</Link>
    
    <p>The recipe sideways scoll item using recipe cards</p>
    <RecipeList 
      mode = ":userId recipes"
    />

    </>
  );  
}