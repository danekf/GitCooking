import './CommentListItem_style.scss';
import CommentListItem from "./commentListItem";


export default function CommentList(props) {
  const {comments} = props;


    return(
      <>
      <div>
        <h1 className='comment-title'>Comments:</h1>
        <ul className="comment-list">
          {comments.map( (comment) => <li><CommentListItem comment={comment}/></li>)}            
        </ul>
      </div>
      </> 
    )
}