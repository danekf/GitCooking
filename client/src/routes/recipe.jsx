import { Link } from "react-router-dom";

export default function Recipe() {
  return (
    <body>
    {/* This should take up the whole screen, do not show the header, profile pic and stuff, this covers it */}
      <Link to="/">X</Link>
      <h1>Recipe Name</h1>

      <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Small-dark-green-circle.svg/1200px-Small-dark-green-circle.svg.png" width = "50px" alt='profilePic'></img>
      <h2>:userName</h2>
      <h3><img src='https://media.istockphoto.com/photos/fork-picture-id149341227' width='50px'></img>Fork it</h3>
      <h3><img src='https://cdn.shopify.com/s/files/1/0780/9439/products/gestrura-spoon-silver.jpg?v=1640188238' width='50px'></img>Spoon it</h3>
      <h3>Rating from MUI?</h3>
      
      <h2>Ingredients</h2>

      <h2>Equipment</h2>

      <h2>Instructions</h2>

      <h2>Comments: </h2>
      <ul>
        <li>comment</li>
        <li>comment</li>
        <li>comment</li>
      </ul>

      <div>Picture of food here for desktop view</div>


    </body>
  );
}