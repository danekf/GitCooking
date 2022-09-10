import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.scss'

export default function SearchBar() {
  return (

    <InputGroup className="search-bar">
        <InputGroup.Text id="search-button">
          Search 🍳
        </InputGroup.Text>

        <Form.Control
          placeholder="What's cookin'?"
        />
    </InputGroup>

  );  
}