import './Dashboard.css';
import StatsCard from './StatsCard';

function Dashboard({ stats, simulations, onNewSimulation }) {
  if (!stats) {
    return <div className="dashboard loading">
      <div className="loader"></div>
      <p>Loading dashboard...</p>
    </div>;
  }

  const successRate = stats.successRate ? (stats.successRate * 100).toFixed(2) : '0';

  return (
    <div className="dashboard">
      <section className="dashboard-header glass-panel">
        <div className="header-content">
          <h2>Welcome to CloudSim 7G</h2>
          <p>Your next-generation cloud infrastructure simulation platform.</p>
        </div>
      </section>

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
            value={stats.totalSimulations || 0}
            unit=""
            icon="📊"
            color="primary"
          />

          <StatsCard
            title="Avg. Execution Time"
            value={(stats.averageExecutionTime || 0).toFixed(2)}
            unit="seconds"
            icon="⏱️"
            color="secondary"
          />

          <StatsCard
            title="Average Cost"
            value={(stats.averageCost || 0).toFixed(2)}
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
            value={stats.totalCloudlets || 0}
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
            <p className="hint">
              Go to the 'New Simulation' tab to get started!
            </p>
          </div>
        ) : (
          <div className="simulations-list">
            {simulations.slice(-5).reverse().map((sim) => (
              <div key={sim.simulationId} className="sim-item">
                <div className="sim-info">
                  <h4>{sim.simulationName}</h4>

                  <div className="sim-badges">
                    <span className="info-badge">
                      ☁️ {sim.totalCloudlets} Cloudlets
                    </span>

                    <span className="info-badge">
                      ⏱️ {sim.totalExecutionTime.toFixed(2)}s
                    </span>

                    <span className="info-badge">
                      💰 ${sim.totalCostOfExecution.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="sim-status">
                  <span
                    className={`status-pill ${
                      sim.successfulCloudlets === sim.totalCloudlets
                        ? 'success'
                        : 'warning'
                    }`}
                  >
                    {sim.successfulCloudlets}/{sim.totalCloudlets} Successful
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