import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.scss'
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import RecipeCard from '../recipes/recipeCard';

export default function SearchBar(props) {
  const [searchText, setSearchText]= useState();
  const {modalProps, getTriggerProps} = useModal();
  const [results, setResults]=useState([]);

  const SEARCHING = 'SEARCHING';
  const RESULTS = 'RESULTS';
  const NONE = 'NONE';

  const [mode, setMode] = useState(SEARCHING)

  const searchDb = (event) =>{
    event.preventDefault();
    setMode(SEARCHING);
    console.log('Searching db for ', searchText)
    axios({
      method: 'post',
      url: '/api/search',
      data: {searchText: searchText}
    })
    .then((response)=>{
      if(response.data.length>0){
        setResults(response.data)
      }
      else{
        setMode(NONE)
      }
    })
  }

  return (
  <>
    <InputGroup className="search-bar" onSubmit={searchDb}>
        <InputGroup.Text id="search-button" onClick={searchDb} {...getTriggerProps({ background: '#FAF1E6' })}>
          Search 🍳
        </InputGroup.Text>

        <Form.Control
          placeholder="What's cookin'?"
          value = {searchText}
          onChange={(event)=>setSearchText(event.target.value)}
        />
    </InputGroup>
    <Modal {...modalProps}>
      {mode === 'SEARCHING' && 
        <>
        <img src='https://media0.giphy.com/media/6rmxsMnN0kSryPsI9p/200w.gif?cid=82a1493ba0njjpjmt8bktz0eefzomnladadlpvsztsw6v2h3&rid=200w.gif&ct=g' width='100px'/>
        Searching...
        </>
      }

      {mode === 'RESULTS' &&
        <>
          {results.map((recipe) => <li><RecipeCard recipe={recipe}/></li>)}
        </>
      }

      {mode === 'NONE' && 
      <>

      </>
      }
    </Modal>
  </>
  );  
}