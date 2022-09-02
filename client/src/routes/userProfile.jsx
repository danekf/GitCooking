import RecipeList from './recipeList'

export default function UserProfile() {
  return (
    <header>
    <h1>No profiling here!</h1>
    <RecipeList 
      mode = ":userId recipes"
    />
    </header>
    
  );  
}