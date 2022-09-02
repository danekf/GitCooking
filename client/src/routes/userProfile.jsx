import {} from "../helpers/profileHelpers";
import { Link } from "react-router-dom";

import RecipeList from './recipes/recipeList'



export default function UserProfile() {
  // const profileData = getProfileData();
  return (

    <header>
    <h1>Username</h1>
    <p>The recipe sideways scoll item using recipe cards</p>
    <RecipeList 
      mode = ":userId recipes"
    />
    <p>Bio goes here (ex: profileData.bio)</p>
    <p>Contact info goes here</p>
    <p>Socials goes here</p>
    <p>Qualifications go here</p>
    <p>Badges go here</p>

    
    <Link to='/users/:userName/:recipeId'>TEMPORARY LINK TO A RECIPE</Link>

    </header>
    
  );  
}