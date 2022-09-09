import './CommentListItem_style.scss';

import CommentListItem from "./commentListItem";

export default function CommentList(props) {
    return(
      <>
      <div>
        <h1 className='comment-title'>Comments:</h1>
        <ul className="comment-list">
          <li>
            <CommentListItem/>
          </li>
        </ul>
      </div>
      </> 
    )
}