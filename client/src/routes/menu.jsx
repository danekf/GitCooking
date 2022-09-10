import './menu.scss';
import SearchBar from "./components/searchBar";
// import { Link } from "react-router-dom";


export default function Menu() {
  return (
    <>
    <h1 className="menu-title">What's on the menu?</h1>

    <h1>Its Searching Time!</h1>


      <div className="search-bar-feature">
        <SearchBar />  
      </div>

    <h2 className='advanced-search-title'>Advanced search</h2>
   
    tags   
    </>

    

  );    
}