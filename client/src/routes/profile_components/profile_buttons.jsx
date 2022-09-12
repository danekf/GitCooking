import { Link } from "react-router-dom";
import useApplicationData from "../../hooks/userHook";

export default function ProfileButtons () {
  const { user, setUser} = useApplicationData();

  return (
    <>
    {/* Conditional Rendering, if a user is logged in show the favourites button, if a user is not logged in show the report button */}
    {!user ? 
      <div className="buttons-container">
        <button className="message-button">
          Message
        </button>
        <button className="report-button">
          Report
        </button>
      </div>
    :
      <div className="buttons-container">
        <button className="message-button">
          Messages
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