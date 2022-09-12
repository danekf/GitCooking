import './CommentListItem_style.scss';
import CommentListItem from "./commentListItem";
import { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CommentList(props) {
  const {comments, recipeId} = props;

    //post comment
    const [commentValue, setCommentValue] =  useState();
    const submitComment = (event) =>{
      event.preventDefault();
      axios({
        method: "post",
        url: "/api/comments/add",
        data: {comment: commentValue, recipeId: recipeId}
      })
      .then((response)=>{
        if(response.status===200){
          setCommentValue('');
          toast.success('Comment Addedd')
        }
      })   
    }
    


    return(
      <>
      <div>
        <h1 className='comment-title'>Comments:</h1>

        {/* Comment input form */}
        <form className='comment-form' onSubmit={submitComment}>
          <input placeholder='Enter a comment' value={commentValue} onChange={(event)=>setCommentValue(event.target.value)}></input>
          <i class="fa-solid fa-message" onClick={submitComment}>Submit</i>
        </form>

        <ul className="comment-list">
          {comments.map( (comment) => <li><CommentListItem comment={comment}/></li>)}            
        </ul>
      </div>
      <ToastContainer 
      position='top-center'
      autoClose={2000}
      closeOnClick
    />
      </> 
    )
}