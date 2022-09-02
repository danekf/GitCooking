import { Outlet, Link } from "react-router-dom";
import './App.css';



function App() {
  return (
    <div className="App">
      <Outlet />
      <nav>
        <Link to="/userProfile">Profile</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/menu">Menu</Link>
      </nav>
    </div>
  );
}

export default App;
