import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ResultsChart.css';

function ResultsChart({ simulation }) {
  // Utility for compact axis ticks
  const formatYAxis = (value) => {
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return Number(value).toLocaleString();
  };

  const formatTime = (seconds) => {
    if (seconds >= 86400) return { value: Number((seconds / 86400).toFixed(2)).toLocaleString(), unit: 'days' };
    if (seconds >= 3600) return { value: Number((seconds / 3600).toFixed(2)).toLocaleString(), unit: 'hours' };
    if (seconds >= 60) return { value: Number((seconds / 60).toFixed(2)).toLocaleString(), unit: 'mins' };
    return { value: Number(seconds.toFixed(2)).toLocaleString(), unit: 's' };
  };

  // Prepare data for charts
  const performanceData = [
    {
      name: 'Exec Time',
      value: Number(simulation.totalExecutionTime.toFixed(2))
    },
    {
      name: 'Avg Per Cloudlet',
      value: Number(simulation.averageCloudletExecutionTime.toFixed(2))
    }
  ];

  const resourceData = [
    {
      name: 'CPU',
      value: Number((simulation.averageCpuUtilization * 100).toFixed(1))
    },
    {
      name: 'RAM',
      value: Number((simulation.averageRamUtilization * 100).toFixed(1))
    }
  ];

  const successData = [
    {
      name: 'Successful',
      value: simulation.successfulCloudlets,
      color: '#28a745'
    },
    {
      name: 'Failed',
      value: Math.max(0, simulation.totalCloudlets - simulation.successfulCloudlets),
      color: '#dc3545'
    }
  ];

  const costEnergyData = [
    {
      metric: 'Cost',
      value: Number(simulation.totalCostOfExecution.toFixed(2))
    },
    {
      metric: 'Energy (Wh)',
      value: Number(simulation.totalWattHoursOfEnergy.toFixed(2))
    }
  ];

  return (
    <section className="charts-section">
      <h3>Performance Visualizations</h3>
      
      <div className="charts-grid">
        {/* Execution Time Chart */}
        <div className="chart-container">
          <h4>Execution Time Analysis</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'auto']} width={75} tickFormatter={formatYAxis} />
              <Tooltip formatter={(val) => Number(val).toLocaleString()} />
              <Bar dataKey="value" fill="#0066cc" name="Time (seconds)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Utilization */}
        <div className="chart-container">
          <h4>Resource Utilization</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#00cc99" name="Utilization (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate Pie Chart */}
        <div className="chart-container">
          <h4>Cloudlet Success Rate</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={successData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {successData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cost and Energy */}
        <div className="chart-container">
          <h4>Cost & Energy Metrics</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis yAxisId="left" domain={[0, 'auto']} width={75} tickFormatter={formatYAxis} />
              <Tooltip formatter={(val) => Number(val).toLocaleString()} />
              <Bar yAxisId="left" dataKey="value" fill="#ffc107" name="Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cloudlet Distribution */}
        <div className="chart-container">
          <h4>Cloudlet Statistics</h4>
          <div className="stats-display">
            <div className="stat-item">
              <span className="stat-label">Total Cloudlets</span>
              <span className="stat-val stat-val-large">{Number(simulation.totalCloudlets).toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Successful</span>
              <span className="stat-val stat-val-success">{Number(simulation.successfulCloudlets).toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Failed</span>
              <span className="stat-val stat-val-danger">{Number(Math.max(0, simulation.totalCloudlets - simulation.successfulCloudlets)).toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Success Rate</span>
              <span className="stat-val stat-val-success">
                {((simulation.successfulCloudlets / Math.max(1, simulation.totalCloudlets)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="chart-container">
          <h4>Efficiency Metrics</h4>
          <div className="efficiency-display">
            <div className="efficiency-item">
              <div className="efficiency-label">Cost per Cloudlet</div>
              <div className="efficiency-value">${Number((simulation.totalCostOfExecution / Math.max(1, simulation.totalCloudlets)).toFixed(3)).toLocaleString()}</div>
            </div>
            <div className="efficiency-item">
              <div className="efficiency-label">Avg Execution Time</div>
              <div className="efficiency-value">{formatTime(simulation.averageCloudletExecutionTime).value}{formatTime(simulation.averageCloudletExecutionTime).unit}</div>
            </div>
            <div className="efficiency-item">
              <div className="efficiency-label">Simulation Overhead</div>
              <div className="efficiency-value">{Number(simulation.simulationDuration).toLocaleString()}ms</div>
            </div>
            <div className="efficiency-item">
              <div className="efficiency-label">CPU Efficiency</div>
              <div className="efficiency-value">{(simulation.averageCpuUtilization * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsChart;
