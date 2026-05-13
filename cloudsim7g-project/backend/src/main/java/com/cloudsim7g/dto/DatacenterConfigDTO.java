package com.cloudsim7g.dto;

public class DatacenterConfigDTO {
    private String name;
    private int numHosts;
    private int mipsPerHost;
    private int ramPerHost;
    private int bandwidthPerHost;
    private String schedulingPolicy;
    private String vmAllocationPolicy;

    public DatacenterConfigDTO() {}

    public DatacenterConfigDTO(String name, int numHosts, int mipsPerHost, int ramPerHost, int bandwidthPerHost, String schedulingPolicy, String vmAllocationPolicy) {
        this.name = name;
        this.numHosts = numHosts;
        this.mipsPerHost = mipsPerHost;
        this.ramPerHost = ramPerHost;
        this.bandwidthPerHost = bandwidthPerHost;
        this.schedulingPolicy = schedulingPolicy;
        this.vmAllocationPolicy = vmAllocationPolicy;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getNumHosts() { return numHosts; }
    public void setNumHosts(int numHosts) { this.numHosts = numHosts; }
    public int getMipsPerHost() { return mipsPerHost; }
    public void setMipsPerHost(int mipsPerHost) { this.mipsPerHost = mipsPerHost; }
    public int getRamPerHost() { return ramPerHost; }
    public void setRamPerHost(int ramPerHost) { this.ramPerHost = ramPerHost; }
    public int getBandwidthPerHost() { return bandwidthPerHost; }
    public void setBandwidthPerHost(int bandwidthPerHost) { this.bandwidthPerHost = bandwidthPerHost; }
    public String getSchedulingPolicy() { return schedulingPolicy; }
    public void setSchedulingPolicy(String schedulingPolicy) { this.schedulingPolicy = schedulingPolicy; }
    public String getVmAllocationPolicy() { return vmAllocationPolicy; }
    public void setVmAllocationPolicy(String vmAllocationPolicy) { this.vmAllocationPolicy = vmAllocationPolicy; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private int numHosts;
        private int mipsPerHost;
        private int ramPerHost;
        private int bandwidthPerHost;
        private String schedulingPolicy;
        private String vmAllocationPolicy;

        public Builder name(String name) { this.name = name; return this; }
        public Builder numHosts(int numHosts) { this.numHosts = numHosts; return this; }
        public Builder mipsPerHost(int mipsPerHost) { this.mipsPerHost = mipsPerHost; return this; }
        public Builder ramPerHost(int ramPerHost) { this.ramPerHost = ramPerHost; return this; }
        public Builder bandwidthPerHost(int bandwidthPerHost) { this.bandwidthPerHost = bandwidthPerHost; return this; }
        public Builder schedulingPolicy(String schedulingPolicy) { this.schedulingPolicy = schedulingPolicy; return this; }
        public Builder vmAllocationPolicy(String vmAllocationPolicy) { this.vmAllocationPolicy = vmAllocationPolicy; return this; }
        public DatacenterConfigDTO build() {
            return new DatacenterConfigDTO(name, numHosts, mipsPerHost, ramPerHost, bandwidthPerHost, schedulingPolicy, vmAllocationPolicy);
        }
    }
}
