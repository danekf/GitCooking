import Dropdown from 'react-bootstrap/Dropdown';
import './dropdownMenu.scss'
import axios from 'axios';


export default function HeaderDropdownMenu(props) {

  const userExists = props.user.id;

  const logout = () => {
    axios({
      method: "post",
      url: "/api/logout",
    })
    .then (()=>{
      window.location = "/";
    })
  }

  return (
    <Dropdown className="dropdown-header">
      <Dropdown.Toggle variant="success" id="mobile-dropdown-menu-button" className="dropdown">
      <i className="fa-solid fa-right-to-bracket"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>

     {/* If user exists render username, create recipe and logout buttons */}
      {/* {userExists &&
        <Dropdown.Item>Profile Picture</Dropdown.Item>
      } */}

      {userExists && 
        <Dropdown.Item id="dropdown-text" href="/users/:userName">{props.user.username}</Dropdown.Item>
      }     

      {userExists && 
        <Dropdown.Item href="/newRecipe">Create</Dropdown.Item>
      }

      {userExists && 
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      }

    {/* If user does not exist render register and log */}

      {!userExists && 
        <Dropdown.Item href="/register">Register</Dropdown.Item>
      }

      {!userExists && 
        <Dropdown.Item href="/Login">Login</Dropdown.Item>
      }
        
      {!userExists &&
        <Dropdown.Item href="#/action-1"></Dropdown.Item>
      }
        
      </Dropdown.Menu>
    </Dropdown>
  );
}
