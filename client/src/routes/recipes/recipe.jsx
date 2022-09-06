import './recipe_style.scss';

import CommentList from "../comments/commentList";

export default function Recipe() {
  return (
    <>
      <div className='recipe-card'>

        <div className='recipe-icons'>
        <i class="fa-solid fa-spoon"></i>
        <i class="fa-solid fa-utensils"></i>

        </div>

        <h1 className='recipe-title'>Hamlet's Omelette</h1>
        
        <h5 className='username-heading'>This recipe is made with love by: <span className='username'>Shakespeare</span></h5>

        <img className="recipe-img"src="" alt="Recipe Image" />

        <div className='recipe-stat'>
          <h6>Prep Time</h6>
          <p></p>

          <h6>Cook Time</h6>
          <p></p>
          
          <h6>Servings</h6>
          <p></p>
        </div>

        <h4>Equipments Required</h4>
        <ul>
          <li></li>
        </ul>
        <h4>Ingredients</h4>
        <ul>
          <li></li>
        </ul>
        <h4>Instructions</h4>
        <ul>
          <li></li>
        </ul>

        <h5>Tags</h5>
        <p></p>

      </div>
      
      <div className='comment-list-card-in-recipe'>
        <ul>
        <CommentList/>
        </ul>
      </div>
    </>
  );
}