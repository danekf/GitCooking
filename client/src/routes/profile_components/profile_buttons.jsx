import { useLocation, Link } from "react-router-dom";

export default function ProfileButtons () {
  const location = useLocation();
  const user = location.state?.user

  return (
    <>
    {/* Conditional Rendering, if a user is logged in show the favourites button, if a user is not logged in show the report button */}
    {!user ? 
      <div>
        <button className="message-button">
          Message
        </button>
        <button className="report-button">
          Report
        </button>
      </div>
    :
      <div>
        <button className="message-button">
          Message
        </button>
        <Link to='/favourites' className="link-favourites">
        <button className="favourites-button">
          Favourites
        </button>
        </Link>
      </div>
    }
    </>
  );
}