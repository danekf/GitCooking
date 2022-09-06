import './CommentListItem_style.scss';

export default function CommentListItem() {
  return (
    <>
    <div className="comment-body">
      <h6 className="comment-username">@shakespeare</h6>
      <div>
        <p className="comment-context">
          He'll go along o'er the wide world with me; Leave me alone to woo him. 
        </p>
      </div>
    </div>
    </>
  );
}