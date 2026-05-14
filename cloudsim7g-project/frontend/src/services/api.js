import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const simulationAPI = {
  health: () => apiClient.get('/simulations/health'),
  
  runSimulation: (config) => apiClient.post('/simulations/run', config),
  
  getSimulation: (simulationId) => apiClient.get(`/simulations/${simulationId}`),
  
  getAllSimulations: () => apiClient.get('/simulations'),
  
  getStatsSummary: () => apiClient.get('/simulations/stats/summary'),
  
  getQuickStartTemplate: () => apiClient.get('/simulations/template/quick-start'),
  
  deleteSimulation: (simulationId) => apiClient.delete(`/simulations/${simulationId}`),
  
  clearAllResults: () => apiClient.delete('/simulations')
};

export default apiClient;
