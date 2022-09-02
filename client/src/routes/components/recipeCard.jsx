export default function RecipeCard(props) {
  return (
    <header>
    {props.mode}
    <h1>Hello I am a recipe card, hover over me to show different stuff!</h1>
    <h2>Thank you for hovering!</h2>
    </header>
  );  
}