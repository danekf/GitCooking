import { Link } from "react-router-dom";
import CommentList from "../comments/commentList";


export default function Recipe() {
  return (
    <>
      <div>

        <div>
        <i class="fa-solid fa-spoon"></i>
        <i class="fa-solid fa-utensils"></i>

        </div>

        <h1>Recipe Name</h1>

        <img src="" alt="Recipe Image" />

        <h6>This recipe is made with love by: Shakespeare</h6>

        <h4>Prep Time</h4>
        <p></p>

        <h4>Cook Time</h4>
        <p></p>
        
        <h4>Servings</h4>
        <p></p>

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

        <h4>Tags</h4>
        <p></p>

      </div>
      
      <div>
        <ul>
        <CommentList/>
        </ul>
      </div>
    </>
  );
}