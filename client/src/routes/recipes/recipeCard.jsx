import './recipeCard_style.scss';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function RecipeCard(props) {
  const recipe = props.recipe;
  console.log('Recipe is: ', recipe);

  const instructionstep = 1;

  console.log(recipe.estimatedtime)
 

  //hover handler
  const[hover, setHover]= useState(false)

  return (
    <div>
      <h1>{recipe.title}</h1>
      {!hover && (
        <div onMouseEnter={() => setHover(true)}>
          Estimated time : {recipe.estimatedtime}
        </div>
      )}

      {hover && (
        <div onMouseLeave={() => setHover(false)}>
        <ul> 
          <li>Tags: {recipe.tags.map((tag)=> `${tag},`)}</li>
        </ul>
      
      </div>
      )}
































    {/* <div className='recipe-card-body'>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001451_6-c8d72b8.jpg?resize=960,872?quality=90&webp=true&resize=600,545"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?resize=960,872?quality=90&webp=true&resize=600,545"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/meatball-lasagne-e64e936.jpg?resize=960,872?quality=90&webp=true&resize=600,545"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div> */}

    </div>
  );  
}
