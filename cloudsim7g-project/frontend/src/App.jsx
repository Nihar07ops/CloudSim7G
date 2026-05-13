import { useState, useEffect } from 'react';
import './App.css';
import SimulationForm from './components/SimulationForm';
import SimulationResults from './components/SimulationResults';
import Dashboard from './components/Dashboard';
import { simulationAPI } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [simulations, setSimulations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSimulation, setCurrentSimulation] = useState(null);

  useEffect(() => {
    fetchSimulations();
    fetchStats();
    
    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      fetchSimulations();
      fetchStats();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchSimulations = async () => {
    try {
      const response = await simulationAPI.getAllSimulations();
      setSimulations(response.data);
    } catch (error) {
      console.error('Error fetching simulations:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await simulationAPI.getStatsSummary();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleRunSimulation = async (config) => {
    setLoading(true);
    try {
      const response = await simulationAPI.runSimulation(config);
      setCurrentSimulation(response.data);
      setSimulations([...simulations, response.data]);
      setStats(null); // Reset stats to trigger refetch
      fetchStats();
      setActiveTab('results');
    } catch (error) {
      alert('Error running simulation: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSimulation = async (simulationId) => {
    try {
      await simulationAPI.deleteSimulation(simulationId);
      setSimulations(simulations.filter(s => s.simulationId !== simulationId));
      fetchStats();
    } catch (error) {
      alert('Error deleting simulation: ' + error.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CloudSim 7G Simulator</h1>
        <p className="subtitle">Cloud Infrastructure Simulation Platform</p>
      </header>

      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          New Simulation
        </button>
        <button 
          className={`tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Results ({simulations.length})
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} simulations={simulations} />
        )}

        {activeTab === 'simulator' && (
          <SimulationForm onSubmit={handleRunSimulation} isLoading={loading} />
        )}

        {activeTab === 'results' && (
          <SimulationResults 
            simulations={simulations}
            currentSimulation={currentSimulation}
            onDelete={handleDeleteSimulation}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>CloudSim 7G Simulator v1.0.0 | Based on the CloudSim 7G Research Paper</p>
      </footer>
    </div>
  );
}

export default App;
