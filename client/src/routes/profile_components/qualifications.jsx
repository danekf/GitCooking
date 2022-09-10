export default function Qualifications (props) {
  const qualifications = props.qualifications;
  return (
    <div>
      <p className="qualifications">Qualifications</p>
      <ul className="qualifications-list-item">
        {qualifications && qualifications.map((qualification)=><li>{qualification}</li>)}
      </ul>
    </div>
  );
}