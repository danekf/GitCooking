import SearchBar from "./components/searchBar";
import { Link } from "react-router-dom";


export default function Menu() {
  return (

    <header>
    {/* This X is just a simulation of how clicking X will close the popup menu NOT a final implementation, the USE NAVIGATE hook is what we will use */}
    <Link to="/">X</Link>
    
    <h1>Whats on the menu?</h1>
    <SearchBar />    
    </header>
  );    
}