package com.cloudsim7g.dto;

public class SimulationConfigDTO {
    private String simulationName;
    private DatacenterConfigDTO datacenterConfig;
    private VmConfigDTO vmConfig;
    private CloudletConfigDTO cloudletConfig;
    private boolean enableNetworkSimulation;
    private boolean enablePowerAwareness;
    private boolean enableContainers;

    public SimulationConfigDTO() {}

    public SimulationConfigDTO(String simulationName, DatacenterConfigDTO datacenterConfig, VmConfigDTO vmConfig, CloudletConfigDTO cloudletConfig, boolean enableNetworkSimulation, boolean enablePowerAwareness, boolean enableContainers) {
        this.simulationName = simulationName;
        this.datacenterConfig = datacenterConfig;
        this.vmConfig = vmConfig;
        this.cloudletConfig = cloudletConfig;
        this.enableNetworkSimulation = enableNetworkSimulation;
        this.enablePowerAwareness = enablePowerAwareness;
        this.enableContainers = enableContainers;
    }

    public String getSimulationName() { return simulationName; }
    public void setSimulationName(String simulationName) { this.simulationName = simulationName; }
    public DatacenterConfigDTO getDatacenterConfig() { return datacenterConfig; }
    public void setDatacenterConfig(DatacenterConfigDTO datacenterConfig) { this.datacenterConfig = datacenterConfig; }
    public VmConfigDTO getVmConfig() { return vmConfig; }
    public void setVmConfig(VmConfigDTO vmConfig) { this.vmConfig = vmConfig; }
    public CloudletConfigDTO getCloudletConfig() { return cloudletConfig; }
    public void setCloudletConfig(CloudletConfigDTO cloudletConfig) { this.cloudletConfig = cloudletConfig; }
    public boolean isEnableNetworkSimulation() { return enableNetworkSimulation; }
    public void setEnableNetworkSimulation(boolean enableNetworkSimulation) { this.enableNetworkSimulation = enableNetworkSimulation; }
    public boolean isEnablePowerAwareness() { return enablePowerAwareness; }
    public void setEnablePowerAwareness(boolean enablePowerAwareness) { this.enablePowerAwareness = enablePowerAwareness; }
    public boolean isEnableContainers() { return enableContainers; }
    public void setEnableContainers(boolean enableContainers) { this.enableContainers = enableContainers; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String simulationName;
        private DatacenterConfigDTO datacenterConfig;
        private VmConfigDTO vmConfig;
        private CloudletConfigDTO cloudletConfig;
        private boolean enableNetworkSimulation;
        private boolean enablePowerAwareness;
        private boolean enableContainers;

        public Builder simulationName(String simulationName) { this.simulationName = simulationName; return this; }
        public Builder datacenterConfig(DatacenterConfigDTO datacenterConfig) { this.datacenterConfig = datacenterConfig; return this; }
        public Builder vmConfig(VmConfigDTO vmConfig) { this.vmConfig = vmConfig; return this; }
        public Builder cloudletConfig(CloudletConfigDTO cloudletConfig) { this.cloudletConfig = cloudletConfig; return this; }
        public Builder enableNetworkSimulation(boolean enableNetworkSimulation) { this.enableNetworkSimulation = enableNetworkSimulation; return this; }
        public Builder enablePowerAwareness(boolean enablePowerAwareness) { this.enablePowerAwareness = enablePowerAwareness; return this; }
        public Builder enableContainers(boolean enableContainers) { this.enableContainers = enableContainers; return this; }
        public SimulationConfigDTO build() {
            return new SimulationConfigDTO(simulationName, datacenterConfig, vmConfig, cloudletConfig, enableNetworkSimulation, enablePowerAwareness, enableContainers);
        }
    }
}
