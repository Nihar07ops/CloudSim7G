import './Dashboard.css';
import StatsCard from './StatsCard';

function Dashboard({ stats, simulations, onNewSimulation }) {
  if (!stats) {
    return <div className="dashboard loading">
      <div className="loader"></div>
      <p>Loading dashboard...</p>
    </div>;
  }

  const successRate = stats.successRate ? (stats.successRate * 100).toFixed(1) : '0';

  const formatTime = (seconds) => {
    if (seconds >= 86400) return { value: Number((seconds / 86400).toFixed(2)).toLocaleString(), unit: 'days' };
    if (seconds >= 3600) return { value: Number((seconds / 3600).toFixed(2)).toLocaleString(), unit: 'hours' };
    if (seconds >= 60) return { value: Number((seconds / 60).toFixed(2)).toLocaleString(), unit: 'minutes' };
    return { value: Number((seconds || 0).toFixed(2)).toLocaleString(), unit: 'seconds' };
  };

  const avgTime = formatTime(stats.averageExecutionTime || 0);

  return (
    <div className="dashboard">
      <section className="dashboard-header glass-panel">
        <div className="header-content">
          <h2>Welcome to CloudSim 7G</h2>
          <p>Your next-generation cloud infrastructure simulation platform.</p>
        </div>
      </section>

      {/* NEW: Workflow Guide Section */}
      <section className="workflow-guide">
        <h3>How It Works</h3>
        <div className="workflow-steps">
          <div className="step-card">
            <div className="step-icon">⚙️</div>
            <h4>1. Configure</h4>
            <p>Define your Datacenter, Hosts, and Virtual Machines.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🚀</div>
            <h4>2. Run Workload</h4>
            <p>Setup Cloudlets (tasks) and execute the simulation.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">📊</div>
            <h4>3. Analyze</h4>
            <p>Review metrics like Execution Time, Cost, and Resource Usage.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h3>Overall Statistics</h3>
        <div className="stats-grid">
          <StatsCard
            title="Total Simulations"
            value={Number(stats.totalSimulations || 0).toLocaleString()}
            unit=""
            icon="📊"
            color="primary"
          />
          <StatsCard
            title="Avg. Execution Time"
            value={avgTime.value}
            unit={avgTime.unit}
            icon="⏱️"
            color="secondary"
          />
          <StatsCard
            title="Average Cost"
            value={Number((stats.averageCost || 0).toFixed(2)).toLocaleString()}
            unit="units"
            icon="💰"
            color="success"
          />
          <StatsCard
            title="Success Rate"
            value={successRate}
            unit="%"
            icon="✅"
            color="info"
          />
          <StatsCard
            title="Total Cloudlets"
            value={Number(stats.totalCloudlets || 0).toLocaleString()}
            unit="processed"
            icon="☁️"
            color="warning"
          />
        </div>
      </section>

      <section className="recent-simulations">
        <h3>Recent Simulations</h3>
        {simulations.length === 0 ? (
          <div className="empty-state glass-panel">
            <div className="empty-icon">📝</div>
            <h4>No simulations found</h4>
            <p>You haven't run any simulations yet.</p>
            <p className="hint">Go to the 'New Simulation' tab to get started!</p>
          </div>
        ) : (
          <div className="simulations-list">
            {simulations.slice(-5).reverse().map((sim) => (
              <div key={sim.simulationId} className="sim-item">
                <div className="sim-info">
                  <h4>{sim.simulationName}</h4>
                  <div className="sim-badges">
                    <span className="info-badge">☁️ {Number(sim.totalCloudlets).toLocaleString()} Cloudlets</span>
                    <span className="info-badge">⏱️ {formatTime(sim.totalExecutionTime).value} {formatTime(sim.totalExecutionTime).unit}</span>
                    <span className="info-badge">💰 ${Number(sim.totalCostOfExecution.toFixed(2)).toLocaleString()}</span>
                  </div>
                </div>
                <div className="sim-status">
                  <span className={`status-pill ${sim.successfulCloudlets === sim.totalCloudlets ? 'success' : 'warning'}`}>
                    {Number(sim.successfulCloudlets).toLocaleString()}/{Number(sim.totalCloudlets).toLocaleString()} Successful
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
