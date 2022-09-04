import { Outlet, Link } from "react-router-dom";
import './App.css';



function App() {
  return (
    <div className="App">
    <header>
      <Link to='/'><img src='https://www.pngfind.com/pngs/m/597-5975111_unknown-small-copy-small-circle-png-transparent-png.png' width = '50px' alt="gitCookingLogo"></img>Home</Link>
      {/* Condiditional render here for what to show */}
      {/* Not logged in stuff */}
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>

      {/* Logged in stuff here */}
      <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Small-dark-green-circle.svg/1200px-Small-dark-green-circle.svg.png" width = "50px" alt='profilePic'></img>
      Implement "click to edit" on profile pick
      <Link to='/newRecipe'>Create a new recipe</Link>

    </header>
    
    <body>
      <Outlet />
    </body>

    <footer class="app-footer">
      <nav class="app-footer-nav">
          <Link to="/users/:userName">Profile</Link>
          <Link to="/favourites">Favourites</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/menu">Menu</Link>
        </nav>
    </footer>
    </div>
  );
}

export default App;
