import './styles.scss'

export default function ProfilePicture (props) {
  const profilePicture = props.profile_picture;

  return (
    <div> {profilePicture}
    </div>
  );
}