import RecipeList from './recipeList'
import {} from "../helpers/profileHelpers";

export default function UserProfile() {
  return (
    <header>
    <h1>Username</h1>
    <p>The recipe sideways scoll item using recipe cards</p>
    <RecipeList 
      mode = ":userId recipes"
    />
    <p>Bio goes here</p>
    <p>Contact info goes here</p>
    <p>Socials goes here</p>
    <p>Qualifications go here</p>
    <p>Badges go here</p>
    </header>
    
  );  
}