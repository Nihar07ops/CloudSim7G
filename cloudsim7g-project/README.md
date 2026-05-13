# CloudSim 7G Simulator - Full Stack Project

A complete web-based simulation platform for Cloud Computing environments, built on the research from the CloudSim 7G paper.

## 📋 Project Overview

This project implements a full-stack application combining:
- **Backend**: Spring Boot REST API with CloudSim 7G simulation engine
- **Frontend**: React-based interactive dashboard with visualizations
- **Integration**: Real-time simulation configuration and results analysis

### Key Features

✅ **Interactive Cloud Simulation**
- Configure datacenters, VMs, and workloads
- Run multiple simulations with different parameters
- Real-time result tracking and analysis

✅ **Advanced Visualizations**
- Performance charts and metrics
- Resource utilization analysis
- Cost and energy consumption tracking

✅ **Based on CloudSim 7G Research**
- Standardized interfaces for multi-module support
- Nested virtualization support
- Network simulation capabilities
- Power-aware resource management

✅ **User-Friendly Dashboard**
- Real-time statistics
- Simulation history
- Data export functionality
- Responsive design

## 🏗️ Project Structure

```
cloudsim7g-project/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/cloudsim7g/
│       │   ├── CloudSim7gApplication.java
│       │   ├── controller/
│       │   │   └── SimulationController.java
│       │   ├── service/
│       │   │   └── SimulationService.java
│       │   ├── dto/
│       │   │   ├── DatacenterConfigDTO.java
│       │   │   ├── VmConfigDTO.java
│       │   │   ├── CloudletConfigDTO.java
│       │   │   ├── SimulationConfigDTO.java
│       │   │   └── SimulationResultDTO.java
│       │   └── model/
│       └── resources/
│           └── application.properties
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── services/
│       │   └── api.js
│       └── components/
│           ├── SimulationForm.jsx
│           ├── SimulationForm.css
│           ├── Dashboard.jsx
│           ├── Dashboard.css
│           ├── StatsCard.jsx
│           ├── StatsCard.css
│           ├── SimulationResults.jsx
│           ├── SimulationResults.css
│           ├── ResultsChart.jsx
│           └── ResultsChart.css
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Java 21
- Node.js 18+
- Maven 3.8+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or `http://localhost:3000` if configured)

## 📚 API Endpoints

### Simulation Management

- `POST /api/simulations/run` - Run a new simulation
- `GET /api/simulations` - Get all simulation results
- `GET /api/simulations/{simulationId}` - Get specific simulation result
- `DELETE /api/simulations/{simulationId}` - Delete a simulation
- `DELETE /api/simulations` - Clear all results

### Statistics & Templates

- `GET /api/simulations/stats/summary` - Get aggregated statistics
- `GET /api/simulations/template/quick-start` - Get quick start template
- `GET /api/simulations/health` - Health check

## 🎮 Usage Guide

### Running Your First Simulation

1. **Open the Application**
   - Navigate to frontend (http://localhost:5173)

2. **Create a Simulation**
   - Click "New Simulation" tab
   - Use the Quick Start Template or configure manually
   - Adjust parameters:
     - Number of hosts, VMs, cloudlets
     - Processing power (MIPS)
     - Memory and bandwidth
   - Enable advanced features if needed
   - Click "Run Simulation"

3. **View Results**
   - Navigate to "Results" tab
   - Select a simulation from the list
   - View detailed metrics and visualizations
   - Export results as JSON

### Configuration Parameters

**Datacenter Configuration:**
- Number of Hosts: Physical machines (4-100 recommended)
- MIPS per Host: Processing power (10,000-50,000)
- RAM per Host: Memory in MB (4,096-64,000)

**VM Configuration:**
- Number of VMs: Virtual machines to deploy
- MIPS per VM: Allocated processing power
- RAM per VM: Allocated memory
- PEs per VM: Processing elements (cores)

**Cloudlet Configuration:**
- Number of Cloudlets: Tasks to process
- Execution Length: Instructions in millions (MI)
- Processing Elements: Required processors

## 📊 Understanding Results

The simulation returns comprehensive metrics:

| Metric | Description |
|--------|-------------|
| Total Execution Time | Complete simulation runtime |
| Total Cloudlets | Number of tasks processed |
| Successful Cloudlets | Successfully completed tasks |
| Success Rate | Percentage of completed tasks |
| Avg Execution Time | Average per-task execution time |
| Total Cost | Cumulative execution cost |
| Total Energy | Energy consumption in Wh |
| CPU Utilization | Average CPU usage |
| RAM Utilization | Average memory usage |

## 🔧 Configuration

### Backend Configuration (`application.properties`)

```properties
server.port=8080
logging.level.com.cloudsim7g=DEBUG
spring.h2.console.enabled=true
```

### Frontend Configuration (`vite.config.js`)

```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

## 🔍 Key Components

### Backend

**SimulationService.java**
- Orchestrates CloudSim simulations
- Creates datacenters, hosts, VMs, and cloudlets
- Processes and aggregates results

**SimulationController.java**
- REST endpoints for simulation management
- Handles HTTP requests/responses
- Manages simulation history

### Frontend

**Dashboard.jsx**
- Overview of all simulations
- Aggregated statistics
- Recent simulation history

**SimulationForm.jsx**
- Interactive configuration form
- Quick start templates
- Parameter validation

**SimulationResults.jsx**
- Detailed results view
- Metrics display
- Result export

**ResultsChart.jsx**
- Performance visualizations
- Resource utilization charts
- Data export functionality

## 🎨 Technology Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Simulation**: CloudSim Plus 7.0.0
- **Language**: Java 21
- **Build**: Maven
- **Database**: H2 (embedded)

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.2
- **Charts**: Recharts 2.10.3
- **HTTP**: Axios 1.5.0
- **Styling**: CSS3

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📈 Performance Considerations

- Simulations with >10,000 cloudlets may take time
- Large datacenter configurations (>100 hosts) require more memory
- Network simulation adds complexity; use for smaller scenarios
- Power awareness increases computational overhead

## 🤝 Contributing

Key areas for extension:
1. Additional scheduling policies
2. More visualization types
3. Database persistence for long-term result storage
4. Advanced power modeling
5. Network topology customization

## 📖 References

This project is based on the research paper:
**"CloudSim 7G: A Simulation Platform for Next-Generation Cloud Computing Environments"**

Key features from the paper implemented:
- Standardized Host and Guest entity interfaces
- Selection policy abstraction for placement/migration
- Nested virtualization support
- Virtualization overhead modeling
- Code optimization for performance

## 🐛 Troubleshooting

**Backend won't start:**
- Check Java 21 installation: `java --version`
- Clear Maven cache: `mvn clean`

**Frontend won't connect to backend:**
- Verify backend is running on port 8080
- Check CORS configuration in CloudSim7gApplication.java
- Check browser console for errors

**Simulations fail:**
- Check backend logs for detailed error messages
- Verify configuration parameters are valid
- Ensure sufficient system memory

## 📝 License

This project is provided as an educational implementation of CloudSim 7G research.

## ✉️ Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Verify all prerequisites are installed
4. Check API health endpoint: `GET /api/simulations/health`

---

**Happy Simulating!** 🚀☁️
