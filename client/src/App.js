import { Outlet, Link } from "react-router-dom";
import './App.css';



function App() {
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8"/>
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </head>
    <header>
      <Link to='/'><img src='/GitCookingLogo.png' width = '50px' alt="gitCookingLogo"></img>Home</Link>
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
          <li><Link to="/users/:userName"><i class="fa-solid fa-user app-footer-nav-list-item"></i></Link></li>
          <li><Link to="/favourites"><i class="fa-solid fa-star app-footer-nav-list-item"></i></Link></li>
          <li><Link to="/chat"><i class="fa-solid fa-comment app-footer-nav-list-item"></i></Link></li>
          <li><Link to="/menu"><i class="fa-solid fa-bars app-footer-nav-list-item"></i></Link></li>
        </nav>
    </footer>
    </div>
  );
}

export default App;
