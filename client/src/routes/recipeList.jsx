import RecipeCard from "./components/recipeCard";

export default function RecipeList(props){
  const mode = props.mode;

  return (
    /*conditional logic here for WHAT we are getting based on mode, think conditional rendering in appointment within interview scheduler
    {mode === weeklyRecipes &&  some kind of search for current top recipes, then toprecipes.map(<RecipeCard with props})}
    {mode === user && some kind of search for current top recipes, then userRecipes.map(<RecipeCard with props} */
    <RecipeCard mode = {mode}/>
  );
};