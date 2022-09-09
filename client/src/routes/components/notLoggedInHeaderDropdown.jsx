import Dropdown from 'react-bootstrap/Dropdown';


export default function NotLoggedInHeaderDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic mobile-dropdown-menu-button" className="dropdown">
      <i class="fa-solid fa-right-to-bracket"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/register">Register</Dropdown.Item>
        <Dropdown.Item href="/login">Login</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}