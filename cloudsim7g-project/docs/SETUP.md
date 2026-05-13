# CloudSim 7G Project - Initialization & Deployment Guide

## 📚 Quick Reference

### First Time Setup

#### 1. Backend Setup
```bash
cd cloudsim7g-project/backend
mvn clean install
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

#### 2. Frontend Setup
```bash
cd cloudsim7g-project/frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

#### 3. Verify Everything Works
```bash
curl http://localhost:8080/api/simulations/health
# Expected response: {"status":"CloudSim 7G Backend is running"}
```

## 🎯 Project Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React + Vite) │
│ :5173 - :3000   │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│     Backend     │
│  (Spring Boot)  │
│   :8080/api     │
└────────┬────────┘
         │
┌────────▼────────┐
│  CloudSim 7G    │
│  Simulation     │
│   Engine        │
└─────────────────┘
```

## 📋 Development Workflow

### Daily Development

1. **Start Backend First** (new terminal)
   ```bash
   cd backend
   mvn spring-boot:run
   # Waits for frontend connection
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd frontend
   npm run dev
   # Opens at http://localhost:5173
   ```

3. **Make Changes**
   - Backend changes auto-reload with Spring Boot DevTools
   - Frontend changes hot-reload with Vite

4. **Test Simulation**
   - Go to "New Simulation"
   - Click "Load Quick Start Template"
   - Adjust parameters as needed
   - Click "Run Simulation"

### Code Organization

#### Backend Service Layer
Edit `src/main/java/com/cloudsim7g/service/SimulationService.java`:
- Add new simulation logic
- Create hosts/VMs configuration
- Implement new allocation policies

#### Backend API Layer
Edit `src/main/java/com/cloudsim7g/controller/SimulationController.java`:
- Add new endpoints
- Modify response formats
- Add new request parameters

#### Frontend Components
Edit `src/components/`:
- Add new visualization components
- Extend simulation form
- Add dashboard sections

## 🚀 Deployment

### Production Backend Build

```bash
cd backend
mvn clean package -DskipTests
# Creates: target/cloudsim7g-simulator-1.0.0.jar

# Run JAR
java -Xmx4G -jar target/cloudsim7g-simulator-1.0.0.jar
```

### Production Frontend Build

```bash
cd frontend
npm run build
# Creates: dist/ folder for deployment

# Test build locally
npm run preview
```

### Deploy to Cloud

#### Docker (Optional)

**Backend Dockerfile:**
```dockerfile
FROM openjdk:21-slim
WORKDIR /app
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080
```

Build:
```bash
cd backend
mvn clean package
docker build -t cloudsim7g-backend .
docker run -p 8080:8080 cloudsim7g-backend
```

#### Netlify/Vercel (Frontend)

```bash
npm run build
# Deploy dist/ folder to Netlify/Vercel
# Update API_BASE_URL to production backend
```

#### Heroku (Backend)

```bash
heroku create cloudsim7g-backend
git push heroku main
```

## 📊 Performance Tuning

### Backend JVM Options

```bash
# Increase heap for large simulations
java -Xms2G -Xmx8G -jar target/cloudsim7g-simulator-1.0.0.jar

# Enable GC logging
java -Xlog:gc*:file=gc.log -jar target/cloudsim7g-simulator-1.0.0.jar

# CPU optimization
java -XX:+UseG1GC -XX:+ParallelRefProcEnabled -jar target/cloudsim7g-simulator-1.0.0.jar
```

### Frontend Optimization

```bash
# Production build with source maps
npm run build -- --sourcemap

# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer
```

## 🔍 Monitoring & Debugging

### Backend Logs

```bash
# High-level logging
logging.level.com.cloudsim7g=INFO

# Detailed debugging
logging.level.com.cloudsim7g=DEBUG

# View logs
tail -f logs/application.log
```

### Frontend Debugging

```bash
# Open browser DevTools (F12)
# Inspect Network tab for API calls
# Check Console for JavaScript errors
# Use React DevTools browser extension
```

### API Testing

```bash
# Test health endpoint
curl http://localhost:8080/api/simulations/health

# Test with request body
curl -X POST http://localhost:8080/api/simulations/run \
  -H "Content-Type: application/json" \
  -d @- << 'EOF'
{
  "simulationName": "Test",
  "datacenterConfig": {...}
}
EOF

# Using Postman
# Import collection: cloudsim7g.postman_collection.json
```

## 📦 Managing Dependencies

### Backend

```bash
# Update Maven dependencies
mvn clean install

# Check for vulnerability
mvn org.owasp:dependency-check-maven:check

# See dependency tree
mvn dependency:tree
```

### Frontend

```bash
# Update npm packages
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check package versions
npm outdated
```

## 🧪 Testing

### Backend Unit Tests

```bash
mvn test

# Run specific test
mvn test -Dtest=SimulationServiceTest

# Skip tests during build
mvn package -DskipTests

# Run with coverage
mvn jacoco:report
```

### Frontend Testing

```bash
# Install testing framework (optional)
npm install --save-dev @testing-library/react vitest

# Run tests
npm test

# Check code coverage
npm test -- --coverage
```

## 🔐 Security Considerations

### Backend Security

```properties
# In application.properties
spring.security.user.name=admin
spring.security.user.password=changeme

# Enable HTTPS
server.ssl.key-store=keystore.p12
server.ssl.key-store-password=changeme
```

### API Rate Limiting

Add to SimulationController:
```java
@RateLimiter(limit = 10, timeUnit = "MINUTE")
public ResponseEntity<SimulationResultDTO> runSimulation(...) {...}
```

## 📚 Project Documentation

### Generate API Documentation

```bash
# Backend: Add Swagger dependency
mvn dependency:add -Dplugin=springdoc-openapi-maven-plugin

# Then visit: http://localhost:8080/swagger-ui.html
```

### Generate Javadoc

```bash
mvn javadoc:javadoc
# Output: target/site/apidocs/index.html
```

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Port 8080 already in use | `lsof -i :8080` and kill process, or change port |
| Maven build fails | `mvn clean install -q` |
| Frontend won't connect | Check CORS in CloudSim7gApplication.java |
| Simulation too slow | Reduce cloudlets/hosts or disable network simulation |
| Out of memory | Increase JVM heap: `-Xmx4G` |

### Debug Mode

```bash
# Backend debug mode
mvn -X spring-boot:run

# Frontend debug mode
npm run dev -- --debug
```

## 📈 Scaling Guide

### For 10,000+ Cloudlets

1. **Increase JVM memory**
   ```bash
   java -Xmx16G -jar application.jar
   ```

2. **Enable result pagination**
   - Modify controller to limit results

3. **Implement caching**
   - Cache common configurations

4. **Database persistence**
   - Replace H2 with PostgreSQL/MySQL

### For Production Load

1. **Load balancer**
   ```
   Load Balancer -> Backend Instance 1
                 -> Backend Instance 2
                 -> Backend Instance 3
   ```

2. **Database**
   - Use PostgreSQL instead of H2
   - Add database replication

3. **Caching**
   - Add Redis for result caching
   - Cache simulation templates

## ✅ Pre-Deployment Checklist

### Backend
- [ ] All tests passing: `mvn test`
- [ ] No security vulnerabilities: `mvn dependency-check:check`
- [ ] Logging configured
- [ ] API documentation updated
- [ ] Build successful: `mvn clean package`

### Frontend
- [ ] All components working
- [ ] Responsive design tested
- [ ] API endpoints verified
- [ ] Build successful: `npm run build`
- [ ] No console errors

### Integration
- [ ] Backend and frontend communicate
- [ ] CORS properly configured
- [ ] API health check passes
- [ ] Sample simulation works

## 📞 Support & Resources

- **CloudSim Plus**: https://github.com/manoelcampos/cloudsim-plus
- **Spring Boot Docs**: https://spring.io/projects/spring-boot
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev

## 🎓 Learning Resources

1. **CloudSim 7G Paper**: Review architecture and design
2. **Spring Boot tutorials**: Learn REST API development
3. **React hooks guide**: Master state management
4. **Recharts examples**: Explore chart types

---

**Project successfully initialized!** 🚀
