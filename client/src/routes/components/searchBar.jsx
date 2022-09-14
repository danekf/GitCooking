import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.scss'

export default function SearchBar(props) {
  const [searchText, setSearchText]= useState();

  const searchDb = (event) =>{
    event.preventDefault();
    console.log('Searching db for ', searchText)
    axios({
      method: 'post',
      url: '/api/search',
      data: {searchText: searchText}
    })
    .then((response)=>{
      console.log(response.data);
    })
  }

  return (
    // without a form, pressing enter will not search, leaving as is for now because of styling    
    // <Form onSubmit={searchDb}>
    <InputGroup className="search-bar" onSubmit={searchDb}>
        <InputGroup.Text id="search-button" onClick={searchDb} >
          Search 🍳
        </InputGroup.Text>

        <Form.Control
          placeholder="What's cookin'?"
          value = {searchText}
          onChange={(event)=>setSearchText(event.target.value)}
        />
    </InputGroup>
    // </Form>

  );  
}