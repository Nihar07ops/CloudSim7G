package com.cloudsim7g.dto;

public class CloudletConfigDTO {
    private String name;
    private int numCloudlets;
    private long executionLength;
    private int numPes;
    private int mipsPerPe;

    public CloudletConfigDTO() {}

    public CloudletConfigDTO(String name, int numCloudlets, long executionLength, int numPes, int mipsPerPe) {
        this.name = name;
        this.numCloudlets = numCloudlets;
        this.executionLength = executionLength;
        this.numPes = numPes;
        this.mipsPerPe = mipsPerPe;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getNumCloudlets() { return numCloudlets; }
    public void setNumCloudlets(int numCloudlets) { this.numCloudlets = numCloudlets; }
    public long getExecutionLength() { return executionLength; }
    public void setExecutionLength(long executionLength) { this.executionLength = executionLength; }
    public int getNumPes() { return numPes; }
    public void setNumPes(int numPes) { this.numPes = numPes; }
    public int getMipsPerPe() { return mipsPerPe; }
    public void setMipsPerPe(int mipsPerPe) { this.mipsPerPe = mipsPerPe; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private int numCloudlets;
        private long executionLength;
        private int numPes;
        private int mipsPerPe;

        public Builder name(String name) { this.name = name; return this; }
        public Builder numCloudlets(int numCloudlets) { this.numCloudlets = numCloudlets; return this; }
        public Builder executionLength(long executionLength) { this.executionLength = executionLength; return this; }
        public Builder numPes(int numPes) { this.numPes = numPes; return this; }
        public Builder mipsPerPe(int mipsPerPe) { this.mipsPerPe = mipsPerPe; return this; }
        public CloudletConfigDTO build() {
            return new CloudletConfigDTO(name, numCloudlets, executionLength, numPes, mipsPerPe);
        }
    }
}
