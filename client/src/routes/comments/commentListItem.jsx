import './CommentListItem_style.scss';

export default function CommentListItem(props) {
  const {comment} = props;
  const date = new Date(Date.parse(comment.created_at))
  return (
    <>
    <div className="comment-body">
      <h6 className="comment-username">@{comment.user_id}</h6>
      <div>
        <p className="comment-context">
          {comment.comment}
        </p>
      </div>
      <h6 className="comment-username">Written on {date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        })}
      </h6>
    </div>
    </>
  );
}