import useApplicationData from "../../hooks/userHook";

export default function Socials () {
  const { user, setUser, logout } = useApplicationData();

  return (
    <div>
      <p className="socials">Socials</p>
      <div className="socials-list-item">
        <ul className="socials-ul">
          {user.instagram && <li><a href={user.instagram}><i className="fa-brands fa-instagram"></i></a></li>}
          {user.youtube &&<li><a href={user.youtube}><i className="fa-brands fa-youtube"></i></a></li>}
          {user.tiktok && <li><a href={user.tiktok}><i className="fa-brands fa-tiktok"></i></a></li>}
          {user.twitter && <li><a href={user.twitter}><i className="fa-brands fa-twitter"></i></a></li>}
          {user.linkedin && <li><a href={user.linkedin}><i className="fa-brands fa-linkedin"></i></a></li>}
          {user.facebook && <li><a href={user.facebook}><i className="fa-brands fa-facebook"></i></a></li>}
        </ul>
      </div>
    </div>
  );
}