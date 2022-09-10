import RecipeCard from "./recipes/recipeCard";
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from "react-bootstrap/esm/CarouselItem";


export default function RecipeCarousel(props) {
  const recipes = props.recipes
  return (
    <>
    <Carousel fade>
      {recipes.map((recipe) => 
        <CarouselItem>
          <RecipeCard recipe={recipe}/>          
        </CarouselItem>    
      )}
    </Carousel>   
    </>
  )
}




