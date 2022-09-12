import './CommentListItem_style.scss';

export default function CommentListItem(props) {
  const {comment} = props;
  

  //make human readable date
  let date = new Date(Date.parse(comment.created_at))
  date = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    })


  return (
    <>
    <div className="comment-body">
      <h6 className="comment-username">@{comment.username}</h6>
      <div>
        <p className="comment-context">
          {comment.comment}
        </p>
      </div>
      <h6 className="comment-username">Written on {date}</h6>
    </div>
    </>
  );
}