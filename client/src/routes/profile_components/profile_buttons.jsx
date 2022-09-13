import { Link } from "react-router-dom";
import useApplicationData from "../../hooks/userHook";

export default function ProfileButtons (props) {
  const {user}= props || false

  return (
    <>
    {/* Conditional Rendering, if a user is logged in show the favourites button, if a user is not logged in show the report button */}
    {!user &&
      <div className="buttons-container">
        <button className="message-button">
          Message
        </button>
        <button className="report-button">
          Report
        </button>
      </div>
    }
    </>
  );
}