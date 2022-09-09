import Dropdown from 'react-bootstrap/Dropdown';


export default function LoggedInHeaderDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic mobile-dropdown-menu-button" className="dropdown">
      <i class="fa-solid fa-right-to-bracket"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>


        <Dropdown.Item href="#/action-1"></Dropdown.Item>
        <Dropdown.Item href="/newRecipe">Create</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
