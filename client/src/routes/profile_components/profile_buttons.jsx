import { Link } from "react-router-dom";
const [user, setUser] = useState(false)

export default function ProfileButtons () {
  return (
    <>
      <div>
        <button className="message-button">
          Message
        </button>
        <button className="report-button">
          Report
        </button>
      </div>
    </>
  );
}