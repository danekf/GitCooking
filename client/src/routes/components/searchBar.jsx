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
  const [results, setResults]=useState([]);
  const {modalProps, getTriggerProps} = useModal({
    background: '#FAF1E6'
    });

  const SEARCHING = 'SEARCHING';
  const RESULTS = 'RESULTS';
  const NONE = 'NONE';

  const [mode, setMode] = useState(SEARCHING)

  const searchDb = (event) =>{
    
    event.preventDefault();
    setMode(SEARCHING);
    document.getElementById('secretModalTrigger').click();
    axios({
      method: 'post',
      url: '/api/search',
      data: {searchText: searchText}
    })
    .then((response)=>{
      console.log('response: ', response.data)
      if(response.data.length>0){
        setResults(response.data)
        setMode(RESULTS)
        setSearchText('')
      }
      else{
        setMode(NONE)
        setSearchText('')
      }
    })
  }

  return (
  <>
    <InputGroup className="search-bar" >
        <InputGroup.Text id="search-button" onClick={searchDb}>
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
        <h1>Sorry... no results found for {searchText}.</h1>
        <img src ='https://www.redbrick.me/wp-content/uploads/2019/02/2017-07-12-10-51-59-900x596.jpg' width='50%'/>
      </>
      }
    </Modal>

    {/* Secret and evil modal trigger hidden trigger. TECHNICALLY visible but... not */}
    <div className='secretModalTrigger' id='secretModalTrigger'{...getTriggerProps({ background: '#FAF1E6' })}>.</div>
  </>
  );  
}