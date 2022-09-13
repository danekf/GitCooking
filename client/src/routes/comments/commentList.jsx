import './commentList.scss';
import CommentListItem from "./commentListItem";
import { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CommentList(props) {
  const {comments, setComments, recipeId, username} = props;
  //reverse so that latest is shown first, always
  const commentList = comments.slice(0).reverse();
  
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
        const time = new Date().toISOString();
        setComments([...comments, {
          comment: commentValue,
          created_at: time,
          username: username,
        }])
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
          <textarea className="comment-text-area" placeholder='Enter a comment' value={commentValue} onChange={(event)=>setCommentValue(event.target.value)}></textarea>
          <i class="fa-solid fa-message-comment" onClick={submitComment}>Submit</i>
        </form>

        <ul className="comment-list">
          {commentList.map( (comment) => <li><CommentListItem comment={comment}/></li>)}            
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