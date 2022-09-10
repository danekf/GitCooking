export default function Badges (props) {
  const badges = props.badges;
  return (
    <div>
      <p className="badges">Badges</p>
      <ul className="badges-list-item">
        {badges && badges.map((badge)=><li>{badge}</li>)}
      </ul>
    </div>
  );
  }