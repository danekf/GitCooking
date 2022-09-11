import RecipeCard from "./recipes/recipeCard";
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from "react-bootstrap/esm/CarouselItem";



export default function RecipeCarousel(props) {
  const recipes = props.recipes

  const directionButtons = (direction) => {
    return (
      <span
        aria-hidden="true"
        className={direction === "Next" ? "button-next" : "button-prev"}
      >
        {direction}
      </span>
    );
  };

  return (
    <>
    <Carousel 
      fade
      nextLabel={"Next"}
      prevLabel={"Previous"}
      nextIcon={directionButtons(<i class="fa-solid fa-angles-right"></i>)}
      prevIcon={directionButtons(<i class="fa-solid fa-angles-left"></i>)}
    >
      {recipes.map((recipe) => 
        <CarouselItem>
          <RecipeCard recipe={recipe}/>          
        </CarouselItem>    
      )}
    </Carousel>   
    </>
  )
}




