import './recipe_style.scss';

import CommentList from "../comments/commentList";

export default function Recipe() {
  return (
    <>
    <div className='recipe-body'>
      <div className='recipe-card'>

        <div className='recipe-icons'>
        <i class="fa-solid fa-spoon"></i>
        <i class="fa-solid fa-utensils"></i>

        </div>

        <h1 className='recipe-title'>Hamlet's Omelette</h1>
        
        <h5 className='username-heading'>This recipe is made with love by: <span>@Shakespeare</span></h5>

        <img className="recipe-img"src="" alt="Recipe Image" />

        <div className='recipe-stat'>
          <h6>Prep Time:</h6>
          <p></p>

          <h6>Cook Time:</h6>
          <p></p>
          
          <h6>Servings:</h6>
          <p></p>
        </div>

        <h5 className='heading-lists'>Equipments Required:</h5>
        <ul className='card-body'>
          <li></li>
        </ul>
        <h5 className='heading-lists'>Ingredients:</h5>
        <ul className='card-body'>
          <li></li>
        </ul>
        <h5 className='heading-lists'>Instructions:</h5>
        <ul className='card-body'>
          <li></li>
        </ul>

        <h5 className='tags-subheading'>Tags:</h5>
        <ul className='card-body'>
          <li></li>
        </ul>

      </div>
      
      <div className='comment-list-card-in-recipe'>
        <ul>
        <CommentList/>
        </ul>
      </div>
      </div>
    </>
  );
}