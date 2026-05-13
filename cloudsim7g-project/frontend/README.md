# CloudSim 7G Frontend

Interactive React-based dashboard for CloudSim 7G cloud infrastructure simulation.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## Available Scripts

### `npm run dev`
Runs the app in development mode with Vite hot module replacement.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Preview production build locally.

### `npm run lint`
Run ESLint to check code quality.

## Project Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Main app component
├── App.css                  # App styles
├── index.css                # Global styles
├── services/
│   └── api.js              # API client (Axios)
└── components/
    ├── Dashboard.jsx        # Dashboard view
    ├── Dashboard.css
    ├── StatsCard.jsx        # Statistics card component
    ├── StatsCard.css
    ├── SimulationForm.jsx   # Simulation configuration form
    ├── SimulationForm.css
    ├── SimulationResults.jsx # Results view
    ├── SimulationResults.css
    ├── ResultsChart.jsx     # Chart visualizations
    └── ResultsChart.css
```

## Key Components

### App
Main application component with navigation and routing between views.

### Dashboard
Overview page showing:
- Aggregated statistics
- Recent simulations
- CloudSim 7G information

### SimulationForm
Configuration form for creating new simulations:
- Datacenter settings
- VM configuration
- Cloudlet/workload setup
- Advanced feature toggles
- Quick start template option

### SimulationResults
Results view displaying:
- Simulation list/selector
- Performance metrics
- Charts and visualizations
- Data export functionality

### ResultsChart
Visualizations using Recharts:
- Execution time analysis
- Resource utilization
- Success rate pie chart
- Cost and energy metrics
- Efficiency indicators

### StatsCard
Reusable metric display component with icons and status colors.

## API Integration

API calls are centralized in `services/api.js`:

```javascript
// Example API calls
simulationAPI.runSimulation(config)
simulationAPI.getAllSimulations()
simulationAPI.getStatsSummary()
simulationAPI.getQuickStartTemplate()
simulationAPI.deleteSimulation(id)
```

## Styling

Uses modern CSS3 with:
- CSS Grid and Flexbox layouts
- CSS variables for theming
- Responsive design
- Smooth transitions and animations
- Color-coded metrics and status indicators

### Color Scheme
- Primary: `#0066cc` (Blue)
- Secondary: `#00cc99` (Teal)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Warning: `#ffc107` (Yellow)

## Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components use CSS media queries for mobile optimization.

## Charts and Visualizations

Uses **Recharts** library for interactive charts:
- Bar charts for performance metrics
- Pie charts for success rates
- Line charts for trends
- Responsive container sizing
- Tooltip interactions

## State Management

Uses React hooks:
- `useState` for local component state
- `useEffect` for side effects (API calls)
- Form state management with event handlers

## Features

### Dashboard Features
- Real-time statistics
- Simulation history
- Aggregated metrics
- Quick reference information

### Simulation Form Features
- Interactive parameter configuration
- Form validation
- Quick start templates
- Number range constraints
- Checkbox toggles for advanced features

### Results Features
- Detailed metric display
- Multiple chart types
- Filtering and selection
- JSON export
- Deletion confirmation

## Development Workflow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Make changes** - Files auto-reload with HMR

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy dist folder** to static hosting

## Configuration

### API Endpoint
Change in `services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Proxy Configuration
Set in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true
  }
}
```

### Port
Change in `vite.config.js`:
```javascript
server: {
  port: 5173
}
```

## Dependencies

Key packages in `package.json`:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.5.0",
  "recharts": "^2.10.3",
  "vite": "^5.0.2"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

1. **Code splitting** - Vite handles automatically
2. **CSS minification** - Production build
3. **React optimization** - Functional components with hooks
4. **Image optimization** - Use SVG/icons where possible
5. **Bundle analysis** - Check with build reports

## Troubleshooting

### Cannot connect to backend
- Verify backend is running on port 8080
- Check CORS configuration
- Check browser console for errors

### Form not submitting
- Check browser console for validation errors
- Verify all required fields are filled
- Check network tab for API errors

### Charts not rendering
- Verify Recharts is installed: `npm list recharts`
- Check data format matches expectations
- Verify component dimensions are set

### Styles not loading
- Clear browser cache: Ctrl+Shift+Delete
- Restart dev server
- Check CSS file imports

## Build Instructions

### Development Build
```bash
npm run build -- --mode development
```

### Production Build
```bash
npm run build
```

### Deploy to GitHub Pages
1. Update `vite.config.js` base URL
2. Run `npm run build`
3. Deploy `dist/` folder

## Code Quality

### ESLint
```bash
npm run lint
```

### Format Code
```bash
npm install --save-dev prettier
npx prettier --write .
```

## Advanced Customization

### Adding New Chart Type
1. Import chart from Recharts
2. Create new component
3. Add to ResultsChart
4. Style with CSS

### Adding New Metric Card
1. Extend StatsCard component
2. Add new data field
3. Update Dashboard
4. Adjust grid layout

### Extending Simulation Form
1. Add new form section
2. Update SimulationConfigDTO
3. Add validation
4. Pass to API

## Documentation

- React: https://react.dev
- Vite: https://vitejs.dev
- Recharts: https://recharts.org
- Axios: https://axios-http.com

## Support

For issues:
1. Check browser console (F12)
2. Check network tab for API calls
3. Verify backend is running
4. Check API health endpoint

---

**Frontend Ready!** 🎨
