export default function Badges (props) {
  const badges = props.badges;
  return (
    <div className="badges-container">
      <p className="badges">Badges</p>
      <div className="badges-list-container">
      <ul className="badges-list">
        <div className="badges-list-item">
        {badges && badges.map((badge)=><li>{badge}</li>)}
        </div>
      </ul>
      </div>
    </div>
  );
  }