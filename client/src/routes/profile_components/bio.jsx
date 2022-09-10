export default function Bio (props) {
  const bio=props.bio;
  return (
    <div>
      <p className="bio">Bio</p>
      <p className="bio-paragraph">{bio}</p>
    </div>
  );
}