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
    <header className="app-header">
      <Link to='/'><img src='/GitCookingLogo.png' width = '50px' alt="gitCookingLogo" className="gitcooking-title"></img>GitCooking</Link>
      {/* Condiditional render here for what to show */}
      {/* Not logged in stuff */}

      {/* <Link to='/register' className="badge badge-secondary">Register</Link> */}
      {/* Add a redirect link on Register page for those who have a login
      {/* <Link to='/login'>Login</Link> */}

      {/* Logged in stuff here */}
      {/* Change "Create" in mobile view to "Create a new recipe" in desktop view */}
      <Link to='/newRecipe' className="badge badge-secondary"><span class="mob-view">Create</span><span class="normal-view"> a new recipe</span></Link>
      <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Small-dark-green-circle.svg/1200px-Small-dark-green-circle.svg.png" width = "50px" alt='profilePic'></img>
      {/* Implement "click to edit" on profile pick */}

    </header>
    
    <body>
      <Outlet />
    </body>

    <footer class="app-footer">
      <nav class="app-footer-nav">
          <li><Link to="/users/:userName"><i class="fa-solid fa-user app-footer-nav-list-item"></i></Link></li>
                {/* Add Login for conditional rendering if someone clicks on Profile in footernav & is not logged in */}
                {/* <Link to='/login'>Login</Link> */}
          <li><Link to="/favourites"><i class="fa-solid fa-star app-footer-nav-list-item"></i></Link></li>
          <li><Link to="/chat"><i class="fa-solid fa-comment app-footer-nav-list-item"></i></Link></li>
          <li><Link to="/menu"><i class="fa-solid fa-bars app-footer-nav-list-item"></i></Link></li>
        </nav>
    </footer>
    </div>
  );
}

export default App;
