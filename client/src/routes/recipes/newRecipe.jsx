export default function NewRecipe(props) {
  
  
  return (
    <header>
    <h1>Create a new recipe below!</h1>

    <h2>Ingredients</h2>
      <p>+Add Component and logic</p>
      props.ingredients.map here, creating list item for each prop passed
      
    <h2>Equipment</h2>
    <p>+Add Component and logic</p>
      props.equipment.map here, creating list item for each prop passed
    
    <h2>Instructions</h2>
      <p>+Add Component and logic</p>
      props.instructions.map here, creating list item for each prop passed

    <h2>Tags placeholder</h2>
    </header>
  );  
}