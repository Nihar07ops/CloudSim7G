# CloudSim 7G Backend

Spring Boot REST API for Cloud Infrastructure Simulation using CloudSim Plus 7.0

## Getting Started

### Prerequisites
- Java 21 JDK
- Maven 3.8.1+

### Installation

1. **Build the project:**
   ```bash
   mvn clean install
   ```

2. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

3. **Verify it's running:**
   ```bash
   curl http://localhost:8080/api/simulations/health
   ```

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Health Check
```
GET /simulations/health
```

#### Run Simulation
```
POST /simulations/run
Content-Type: application/json

{
  "simulationName": "My Simulation",
  "datacenterConfig": {
    "name": "DC1",
    "numHosts": 4,
    "mipsPerHost": 20000,
    "ramPerHost": 16000,
    "bandwidthPerHost": 1000,
    "schedulingPolicy": "TimeShared",
    "vmAllocationPolicy": "BestFit"
  },
  "vmConfig": {
    "name": "VM1",
    "numVms": 2,
    "mipsPerVm": 10000,
    "ramPerVm": 4096,
    "bandwidthPerVm": 500,
    "pesPerVm": 2
  },
  "cloudletConfig": {
    "name": "Cloudlet1",
    "numCloudlets": 10,
    "executionLength": 400000,
    "numPes": 2,
    "mipsPerPe": 10000
  },
  "enableNetworkSimulation": false,
  "enablePowerAwareness": false,
  "enableContainers": false
}
```

#### Get All Results
```
GET /simulations
```

#### Get Single Result
```
GET /simulations/{simulationId}
```

#### Get Statistics Summary
```
GET /simulations/stats/summary
```

#### Get Quick Start Template
```
GET /simulations/template/quick-start
```

#### Delete Simulation
```
DELETE /simulations/{simulationId}
```

#### Clear All Results
```
DELETE /simulations
```

## Configuration

Edit `application.properties` to customize:

```properties
# Server
server.port=8080

# Logging
logging.level.com.cloudsim7g=DEBUG

# Database
spring.datasource.url=jdbc:h2:mem:cloudsim7g
```

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/cloudsim7g/
│   │       ├── CloudSim7gApplication.java
│   │       ├── controller/
│   │       │   └── SimulationController.java
│   │       ├── service/
│   │       │   └── SimulationService.java
│   │       ├── dto/
│   │       │   ├── DatacenterConfigDTO.java
│   │       │   ├── VmConfigDTO.java
│   │       │   ├── CloudletConfigDTO.java
│   │       │   ├── SimulationConfigDTO.java
│   │       │   └── SimulationResultDTO.java
│   │       └── model/
│   └── resources/
│       └── application.properties
└── test/
    └── java/
```

## Key Classes

### CloudSim7gApplication
Spring Boot entry point with CORS configuration

### SimulationController
REST endpoints for simulation management

### SimulationService
Core simulation logic using CloudSim Plus:
- `runSimulation()` - Execute a simulation
- `createDatacenter()` - Create datacenter infrastructure
- `createVms()` - Create virtual machines
- `createCloudlets()` - Create workload tasks
- `processResults()` - Aggregate and analyze results

### DTOs (Data Transfer Objects)
- `SimulationConfigDTO` - Complete simulation configuration
- `DatacenterConfigDTO` - Datacenter settings
- `VmConfigDTO` - VM specifications
- `CloudletConfigDTO` - Task/workload parameters
- `SimulationResultDTO` - Simulation results

## Dependencies

Main dependencies from `pom.xml`:

```xml
<!-- Spring Boot -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- CloudSim Plus -->
<dependency>
    <groupId>org.cloudsimplus</groupId>
    <artifactId>cloudsim-plus</artifactId>
    <version>7.0.0</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

## Development

### Build
```bash
mvn clean compile
```

### Run Tests
```bash
mvn test
```

### Package
```bash
mvn package
```

### Run JAR
```bash
java -jar target/cloudsim7g-simulator-1.0.0.jar
```

## Logging

Enable debug logging for simulation details:

```bash
# In application.properties
logging.level.com.cloudsim7g=DEBUG
```

## Common Issues

### Java Version Error
```
Error: Unable to initialize main class
```
**Solution:** Install Java 21:
```bash
java --version  # Should show Java 21+
```

### Port Already in Use
```
Port 8080 already in use
```
**Solution:** Change port in application.properties:
```properties
server.port=8081
```

### Dependency Issues
```
Maven build fails
```
**Solution:** Clear cache:
```bash
mvn clean install -q
```

## Performance Tips

1. **Reduce simulation size for faster runs:**
   - Lower number of hosts (4-10)
   - Fewer VMs (2-5)
   - Fewer cloudlets (10-100)

2. **Disable unnecessary features:**
   - Set `enableNetworkSimulation: false`
   - Set `enablePowerAwareness: false`
   - Set `enableContainers: false`

3. **Monitor memory:**
   - Check GC logs: `-Xlog:gc*`
   - Increase heap if needed: `-Xmx4G`

## Extending the Backend

### Adding Custom Cloudlet Schedulers
1. Extend `CloudletSchedulerTimeShared`
2. Override scheduling logic
3. Add to SimulationService

### Adding Power-Aware Simulation
1. Implement in `SimulationService`
2. Add `enablePowerAwareness` logic
3. Update DTOs with power metrics

### Adding Network Simulation
1. Configure network topology
2. Enable in `SimulationConfigDTO`
3. Add bandwidth constraints

## Documentation

- CloudSim Plus: https://github.com/manoelcampos/cloudsim-plus
- Spring Boot: https://spring.io/projects/spring-boot
- REST API Best Practices: https://restfulapi.net/

## Support

For issues:
1. Check logs: `tail -f backend.log`
2. Verify configuration: `application.properties`
3. Test API: Use Postman or curl

---

**Backend Ready!** 🚀
