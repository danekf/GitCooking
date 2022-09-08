export default function ProfileButtons () {
  return (
    <>
      <div>
        <button className="message-button">
          Message
        </button>
        {(user.id) ? 
        <button className="report-button">
          Report
        </button>
        : 
        <button className="favourites-button">
          Favourites
        </button>
        }
      </div>
    </>
  );
}