package com.cloudsim7g.dto;

public class SimulationResultDTO {
    private String simulationId;
    private String simulationName;
    private double totalExecutionTime;
    private int totalCloudlets;
    private int successfulCloudlets;
    private double averageCloudletExecutionTime;
    private double totalCostOfExecution;
    private double totalWattHoursOfEnergy;
    private double averageCpuUtilization;
    private double averageRamUtilization;
    private long simulationDuration;

    public SimulationResultDTO() {}

    public SimulationResultDTO(String simulationId, String simulationName, double totalExecutionTime, int totalCloudlets, int successfulCloudlets, double averageCloudletExecutionTime, double totalCostOfExecution, double totalWattHoursOfEnergy, double averageCpuUtilization, double averageRamUtilization, long simulationDuration) {
        this.simulationId = simulationId;
        this.simulationName = simulationName;
        this.totalExecutionTime = totalExecutionTime;
        this.totalCloudlets = totalCloudlets;
        this.successfulCloudlets = successfulCloudlets;
        this.averageCloudletExecutionTime = averageCloudletExecutionTime;
        this.totalCostOfExecution = totalCostOfExecution;
        this.totalWattHoursOfEnergy = totalWattHoursOfEnergy;
        this.averageCpuUtilization = averageCpuUtilization;
        this.averageRamUtilization = averageRamUtilization;
        this.simulationDuration = simulationDuration;
    }

    public String getSimulationId() { return simulationId; }
    public void setSimulationId(String simulationId) { this.simulationId = simulationId; }
    public String getSimulationName() { return simulationName; }
    public void setSimulationName(String simulationName) { this.simulationName = simulationName; }
    public double getTotalExecutionTime() { return totalExecutionTime; }
    public void setTotalExecutionTime(double totalExecutionTime) { this.totalExecutionTime = totalExecutionTime; }
    public int getTotalCloudlets() { return totalCloudlets; }
    public void setTotalCloudlets(int totalCloudlets) { this.totalCloudlets = totalCloudlets; }
    public int getSuccessfulCloudlets() { return successfulCloudlets; }
    public void setSuccessfulCloudlets(int successfulCloudlets) { this.successfulCloudlets = successfulCloudlets; }
    public double getAverageCloudletExecutionTime() { return averageCloudletExecutionTime; }
    public void setAverageCloudletExecutionTime(double averageCloudletExecutionTime) { this.averageCloudletExecutionTime = averageCloudletExecutionTime; }
    public double getTotalCostOfExecution() { return totalCostOfExecution; }
    public void setTotalCostOfExecution(double totalCostOfExecution) { this.totalCostOfExecution = totalCostOfExecution; }
    public double getTotalWattHoursOfEnergy() { return totalWattHoursOfEnergy; }
    public void setTotalWattHoursOfEnergy(double totalWattHoursOfEnergy) { this.totalWattHoursOfEnergy = totalWattHoursOfEnergy; }
    public double getAverageCpuUtilization() { return averageCpuUtilization; }
    public void setAverageCpuUtilization(double averageCpuUtilization) { this.averageCpuUtilization = averageCpuUtilization; }
    public double getAverageRamUtilization() { return averageRamUtilization; }
    public void setAverageRamUtilization(double averageRamUtilization) { this.averageRamUtilization = averageRamUtilization; }
    public long getSimulationDuration() { return simulationDuration; }
    public void setSimulationDuration(long simulationDuration) { this.simulationDuration = simulationDuration; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String simulationId;
        private String simulationName;
        private double totalExecutionTime;
        private int totalCloudlets;
        private int successfulCloudlets;
        private double averageCloudletExecutionTime;
        private double totalCostOfExecution;
        private double totalWattHoursOfEnergy;
        private double averageCpuUtilization;
        private double averageRamUtilization;
        private long simulationDuration;

        public Builder simulationId(String simulationId) { this.simulationId = simulationId; return this; }
        public Builder simulationName(String simulationName) { this.simulationName = simulationName; return this; }
        public Builder totalExecutionTime(double totalExecutionTime) { this.totalExecutionTime = totalExecutionTime; return this; }
        public Builder totalCloudlets(int totalCloudlets) { this.totalCloudlets = totalCloudlets; return this; }
        public Builder successfulCloudlets(int successfulCloudlets) { this.successfulCloudlets = successfulCloudlets; return this; }
        public Builder averageCloudletExecutionTime(double averageCloudletExecutionTime) { this.averageCloudletExecutionTime = averageCloudletExecutionTime; return this; }
        public Builder totalCostOfExecution(double totalCostOfExecution) { this.totalCostOfExecution = totalCostOfExecution; return this; }
        public Builder totalWattHoursOfEnergy(double totalWattHoursOfEnergy) { this.totalWattHoursOfEnergy = totalWattHoursOfEnergy; return this; }
        public Builder averageCpuUtilization(double averageCpuUtilization) { this.averageCpuUtilization = averageCpuUtilization; return this; }
        public Builder averageRamUtilization(double averageRamUtilization) { this.averageRamUtilization = averageRamUtilization; return this; }
        public Builder simulationDuration(long simulationDuration) { this.simulationDuration = simulationDuration; return this; }
        public SimulationResultDTO build() {
            return new SimulationResultDTO(simulationId, simulationName, totalExecutionTime, totalCloudlets, successfulCloudlets, averageCloudletExecutionTime, totalCostOfExecution, totalWattHoursOfEnergy, averageCpuUtilization, averageRamUtilization, simulationDuration);
        }
    }
}
