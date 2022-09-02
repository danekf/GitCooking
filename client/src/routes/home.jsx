import RecipeList from './recipes/recipeList'

export default function Home() {
  return (
    <header>
      <h1>Get ready to GitCooking!</h1>
      <RecipeList 
        mode = "weeklyRecipes"
      />
    </header>

  );  
}
