import RecipeList from "./recipes/recipeList";
import './favourites.scss'

export function Favourites () {
  return (
    <>
      <div className="favourites-body">
        <h1 className="favourites-title">Favourites</h1>
        <RecipeList/>
      </div>
    </>
  )
}