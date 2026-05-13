import { useState } from 'react';
import './SimulationResults.css';
import ResultsChart from './ResultsChart';

function SimulationResults({ simulations, currentSimulation, onDelete }) {
  const [selectedSim, setSelectedSim] = useState(currentSimulation || simulations[0] || null);

  const handleSelectSimulation = (sim) => {
    setSelectedSim(sim);
  };

  const handleExportResults = () => {
    if (!selectedSim) return;
    const data = JSON.stringify(selectedSim, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `simulation_${selectedSim.simulationId}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (simulations.length === 0) {
    return (
      <div className="results-container">
        <div className="empty-state">
          <h2>No Results Yet</h2>
          <p>Run a simulation to see results here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-layout">
        {/* Simulations List */}
        <aside className="results-sidebar">
          <h3>Simulation Results ({simulations.length})</h3>
          <div className="simulations-panel">
            {simulations.map((sim) => (
              <div
                key={sim.simulationId}
                className={`result-item ${selectedSim?.simulationId === sim.simulationId ? 'active' : ''}`}
                onClick={() => handleSelectSimulation(sim)}
              >
                <div className="result-name">{sim.simulationName}</div>
                <div className="result-meta">
                  {sim.totalCloudlets} cloudlets
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Detailed Results */}
        <main className="results-content">
          {selectedSim ? (
            <>
              <div className="results-header">
                <div>
                  <h2>{selectedSim.simulationName}</h2>
                  <p className="sim-id">ID: {selectedSim.simulationId}</p>
                </div>
                <div className="results-actions">
                  <button className="btn-export" onClick={handleExportResults}>
                    📥 Export
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      onDelete(selectedSim.simulationId);
                      if (simulations.length > 1) {
                        setSelectedSim(simulations.find(s => s.simulationId !== selectedSim.simulationId));
                      }
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              {/* Charts Section */}
              <ResultsChart simulation={selectedSim} />

              {/* Metrics Grid */}
              <section className="metrics-section">
                <h3>Detailed Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">Total Execution Time</div>
                    <div className="metric-value">
                      {selectedSim.totalExecutionTime.toFixed(2)} <span className="metric-unit">seconds</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Cloudlets</div>
                    <div className="metric-value">
                      {selectedSim.totalCloudlets}
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Successful Cloudlets</div>
                    <div className="metric-value">
                      {selectedSim.successfulCloudlets} <span className="metric-success">/ {selectedSim.totalCloudlets}</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Success Rate</div>
                    <div className="metric-value">
                      {((selectedSim.successfulCloudlets / Math.max(1, selectedSim.totalCloudlets)) * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Average Execution Time per Cloudlet</div>
                    <div className="metric-value">
                      {selectedSim.averageCloudletExecutionTime.toFixed(2)} <span className="metric-unit">seconds</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Cost</div>
                    <div className="metric-value">
                      ${selectedSim.totalCostOfExecution.toFixed(2)}
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Energy</div>
                    <div className="metric-value">
                      {selectedSim.totalWattHoursOfEnergy.toFixed(2)} <span className="metric-unit">Wh</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Average CPU Utilization</div>
                    <div className="metric-value">
                      {(selectedSim.averageCpuUtilization * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Simulation Duration</div>
                    <div className="metric-value">
                      {selectedSim.simulationDuration} <span className="metric-unit">ms</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Average RAM Utilization</div>
                    <div className="metric-value">
                      {(selectedSim.averageRamUtilization * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </section>

              {/* Summary Section */}
              <section className="summary-section">
                <h3>Simulation Summary</h3>
                <div className="summary-text">
                  <p>
                    This simulation executed <strong>{selectedSim.totalCloudlets}</strong> cloudlets with 
                    a <strong>{((selectedSim.successfulCloudlets / Math.max(1, selectedSim.totalCloudlets)) * 100).toFixed(1)}%</strong> success rate. 
                    The total execution time was <strong>{selectedSim.totalExecutionTime.toFixed(2)} seconds</strong>, 
                    resulting in a total cost of <strong>${selectedSim.totalCostOfExecution.toFixed(2)}</strong>.
                  </p>
                  <p>
                    Average per-cloudlet execution time: <strong>{selectedSim.averageCloudletExecutionTime.toFixed(2)} seconds</strong>. 
                    Simulation completed in <strong>{selectedSim.simulationDuration} milliseconds</strong>.
                  </p>
                </div>
              </section>
            </>
          ) : (
            <div className="empty-state">
              <p>Select a simulation to view results</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SimulationResults;
