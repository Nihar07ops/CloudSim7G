import './StatsCard.css';

function StatsCard({ title, value, unit, icon, color }) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <p className="card-value">
          <span className="value-text">{value}</span>
          {unit && <span className="value-unit">{unit}</span>}
        </p>
      </div>
      <div className={`card-accent accent-${color}`}></div>
    </div>
  );
}

export default StatsCard;
