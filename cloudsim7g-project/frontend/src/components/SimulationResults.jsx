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

  const formatTime = (seconds) => {
    if (seconds >= 86400) return { value: Number((seconds / 86400).toFixed(2)).toLocaleString(), unit: 'days' };
    if (seconds >= 3600) return { value: Number((seconds / 3600).toFixed(2)).toLocaleString(), unit: 'hours' };
    if (seconds >= 60) return { value: Number((seconds / 60).toFixed(2)).toLocaleString(), unit: 'minutes' };
    return { value: Number(seconds.toFixed(2)).toLocaleString(), unit: 'seconds' };
  };

  const formatEnergy = (wh) => {
    if (wh >= 1e6) return { value: Number((wh / 1e6).toFixed(2)).toLocaleString(), unit: 'MWh' };
    if (wh >= 1e3) return { value: Number((wh / 1e3).toFixed(2)).toLocaleString(), unit: 'kWh' };
    return { value: Number(wh.toFixed(2)).toLocaleString(), unit: 'Wh' };
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

  const totalTime = formatTime(selectedSim.totalExecutionTime);
  const totalEnergy = formatEnergy(selectedSim.totalWattHoursOfEnergy);
  const avgTime = formatTime(selectedSim.averageCloudletExecutionTime);

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
                  {Number(sim.totalCloudlets).toLocaleString()} cloudlets
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
                      {totalTime.value} <span className="metric-unit">{totalTime.unit}</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Cloudlets</div>
                    <div className="metric-value">
                      {Number(selectedSim.totalCloudlets).toLocaleString()}
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Successful Cloudlets</div>
                    <div className="metric-value">
                      {Number(selectedSim.successfulCloudlets).toLocaleString()} <span className="metric-success">/ {Number(selectedSim.totalCloudlets).toLocaleString()}</span>
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
                      {avgTime.value} <span className="metric-unit">{avgTime.unit}</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Cost</div>
                    <div className="metric-value">
                      ${Number(selectedSim.totalCostOfExecution.toFixed(2)).toLocaleString()}
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Energy</div>
                    <div className="metric-value">
                      {totalEnergy.value} <span className="metric-unit">{totalEnergy.unit}</span>
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
                      {Number(selectedSim.simulationDuration).toLocaleString()} <span className="metric-unit">ms</span>
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
                    This simulation executed <strong>{Number(selectedSim.totalCloudlets).toLocaleString()}</strong> cloudlets with 
                    a <strong>{((selectedSim.successfulCloudlets / Math.max(1, selectedSim.totalCloudlets)) * 100).toFixed(1)}%</strong> success rate. 
                    The total execution time was <strong>{totalTime.value} {totalTime.unit}</strong>, 
                    resulting in a total cost of <strong>${Number(selectedSim.totalCostOfExecution.toFixed(2)).toLocaleString()}</strong>.
                  </p>
                  <p>
                    Average per-cloudlet execution time: <strong>{avgTime.value} {avgTime.unit}</strong>. 
                    Simulation completed in <strong>{Number(selectedSim.simulationDuration).toLocaleString()} milliseconds</strong>.
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
