import './styles.scss'

export default function ProfilePicture (props) {

  return (
    <div> 
      <img src={props.profile_picture} width='80px' className="profile-picture"/>
    </div>
  );
}