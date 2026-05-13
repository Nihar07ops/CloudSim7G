import { useState } from 'react';
import { simulationAPI } from '../services/api';
import './SimulationForm.css';

function SimulationForm({ onSubmit, isLoading }) {
  const [useTemplate, setUseTemplate] = useState(true);
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState(null);

  // Load template on mount or when toggle changes
  const loadTemplate = async () => {
    try {
      const response = await simulationAPI.getQuickStartTemplate();
      setTemplate(response.data);
      setFormData(JSON.parse(JSON.stringify(response.data))); // Deep copy
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };

  const handleUseTemplate = (e) => {
    const checked = e.target.checked;
    setUseTemplate(checked);
    if (checked) {
      loadTemplate();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldPath = name.split('.');

    setFormData(prev => {
      let updated = JSON.parse(JSON.stringify(prev));
      let obj = updated;

      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!obj[fieldPath[i]]) {
          obj[fieldPath[i]] = {};
        }
        obj = obj[fieldPath[i]];
      }

      const lastKey = fieldPath[fieldPath.length - 1];
      obj[lastKey] = type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value);

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData || !formData.simulationName) {
      alert('Please fill in the simulation name');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="simulation-form-container">
      <div className="form-header">
        <h2>Configure Cloud Simulation</h2>
        <p>Follow the steps below to set up your cloud infrastructure and workload parameters.</p>
      </div>

      <div className="template-card glass-panel">
        <div className="template-option">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              className="toggle-checkbox"
              checked={useTemplate}
              onChange={handleUseTemplate}
            />
            <span className="toggle-text">Use Quick Start Template</span>
          </label>
          {useTemplate ? (
             <p className="template-info">Pre-configured with recommended settings for a quick, balanced simulation.</p>
          ) : (
             <p className="template-info">Manual mode: Define every parameter from scratch.</p>
          )}
        </div>
        {(!useTemplate || !template) && !formData && (
           <button onClick={loadTemplate} className="load-template-btn">
             Load Quick Start Template Anyway
           </button>
        )}
      </div>

      {((useTemplate && template) || formData) && (
        <form onSubmit={handleSubmit} className="form-wizard">
          
          {/* Step 1: Basic Info */}
          <section className="form-section glass-panel">
            <div className="section-header">
              <span className="step-number">1</span>
              <div>
                <h3>Basic Information</h3>
                <p className="help-text">Give your simulation a recognizable name so you can identify it in the results.</p>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="simulationName">Simulation Name *</label>
              <input
                type="text"
                id="simulationName"
                name="simulationName"
                value={formData?.simulationName || ''}
                onChange={handleInputChange}
                placeholder="e.g., Energy Efficiency Test"
                required
              />
            </div>
          </section>

          {/* Step 2: Datacenter */}
          <section className="form-section glass-panel">
            <div className="section-header">
              <span className="step-number">2</span>
              <div>
                <h3>Datacenter Configuration</h3>
                <p className="help-text">A Datacenter is the physical facility housing your servers (Hosts). MIPS stands for Millions of Instructions Per Second, representing processing power.</p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dc-numHosts">Number of Hosts</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="dc-numHosts"
                    name="datacenterConfig.numHosts"
                    value={formData?.datacenterConfig?.numHosts || 4}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                  />
                  <small>Physical servers available.</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="dc-mips">MIPS per Host</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="dc-mips"
                    name="datacenterConfig.mipsPerHost"
                    value={formData?.datacenterConfig?.mipsPerHost || 20000}
                    onChange={handleInputChange}
                    min="1000"
                    step="1000"
                  />
                  <small>Total processing capacity.</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="dc-ram">RAM per Host (MB)</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="dc-ram"
                    name="datacenterConfig.ramPerHost"
                    value={formData?.datacenterConfig?.ramPerHost || 16000}
                    onChange={handleInputChange}
                    min="1024"
                    step="1024"
                  />
                  <small>Available physical memory.</small>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Virtual Machines */}
          <section className="form-section glass-panel">
            <div className="section-header">
              <span className="step-number">3</span>
              <div>
                <h3>Virtual Machine (VM) Configuration</h3>
                <p className="help-text">VMs run on top of your physical Hosts. They process the workloads (Cloudlets) assigned to them.</p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vm-numVms">Number of VMs</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="vm-numVms"
                    name="vmConfig.numVms"
                    value={formData?.vmConfig?.numVms || 2}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                  />
                  <small>Virtual machines to provision.</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="vm-mips">MIPS per VM</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="vm-mips"
                    name="vmConfig.mipsPerVm"
                    value={formData?.vmConfig?.mipsPerVm || 10000}
                    onChange={handleInputChange}
                    min="1000"
                    step="1000"
                  />
                  <small>VM processing power.</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="vm-ram">RAM per VM (MB)</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="vm-ram"
                    name="vmConfig.ramPerVm"
                    value={formData?.vmConfig?.ramPerVm || 4096}
                    onChange={handleInputChange}
                    min="512"
                    step="512"
                  />
                  <small>Memory allocated per VM.</small>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Cloudlets (Workload) */}
          <section className="form-section glass-panel">
            <div className="section-header">
              <span className="step-number">4</span>
              <div>
                <h3>Workload (Cloudlets) Configuration</h3>
                <p className="help-text">A Cloudlet represents a task, user request, or application that needs to be executed by the VMs.</p>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cloudlet-num">Number of Cloudlets</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="cloudlet-num"
                    name="cloudletConfig.numCloudlets"
                    value={formData?.cloudletConfig?.numCloudlets || 10}
                    onChange={handleInputChange}
                    min="1"
                    max="1000"
                  />
                  <small>Total tasks to run.</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cloudlet-exec">Execution Length (MI)</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="cloudlet-exec"
                    name="cloudletConfig.executionLength"
                    value={formData?.cloudletConfig?.executionLength || 400000}
                    onChange={handleInputChange}
                    min="1000"
                    step="10000"
                  />
                  <small>Task complexity in Millions of Instructions.</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cloudlet-pes">Processing Elements</label>
                <div className="input-with-hint">
                  <input
                    type="number"
                    id="cloudlet-pes"
                    name="cloudletConfig.numPes"
                    value={formData?.cloudletConfig?.numPes || 2}
                    onChange={handleInputChange}
                    min="1"
                    max="16"
                  />
                  <small>Cores required per task.</small>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Advanced Features */}
          <section className="form-section glass-panel">
            <div className="section-header">
              <span className="step-number">5</span>
              <div>
                <h3>Advanced Features</h3>
                <p className="help-text">Toggle advanced simulation capabilities. (Note: Some features may increase simulation time).</p>
              </div>
            </div>
            <div className="form-checks">
              <label className="checkbox-label glass-toggle">
                <input
                  type="checkbox"
                  name="enableNetworkSimulation"
                  checked={formData?.enableNetworkSimulation || false}
                  onChange={handleInputChange}
                />
                <span>Enable Network Simulation</span>
              </label>
              <label className="checkbox-label glass-toggle">
                <input
                  type="checkbox"
                  name="enablePowerAwareness"
                  checked={formData?.enablePowerAwareness || false}
                  onChange={handleInputChange}
                />
                <span>Enable Power Awareness</span>
              </label>
              <label className="checkbox-label glass-toggle">
                <input
                  type="checkbox"
                  name="enableContainers"
                  checked={formData?.enableContainers || false}
                  onChange={handleInputChange}
                />
                <span>Enable Containers</span>
              </label>
            </div>
          </section>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading-btn' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <><span className="spinner"></span> Running Simulation...</>
              ) : (
                '🚀 Run Simulation'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SimulationForm;
