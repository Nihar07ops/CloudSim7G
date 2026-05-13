package com.cloudsim7g.dto;

public class VmConfigDTO {
    private String name;
    private int numVms;
    private int mipsPerVm;
    private int ramPerVm;
    private int bandwidthPerVm;
    private int pesPerVm;

    public VmConfigDTO() {}

    public VmConfigDTO(String name, int numVms, int mipsPerVm, int ramPerVm, int bandwidthPerVm, int pesPerVm) {
        this.name = name;
        this.numVms = numVms;
        this.mipsPerVm = mipsPerVm;
        this.ramPerVm = ramPerVm;
        this.bandwidthPerVm = bandwidthPerVm;
        this.pesPerVm = pesPerVm;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getNumVms() { return numVms; }
    public void setNumVms(int numVms) { this.numVms = numVms; }
    public int getMipsPerVm() { return mipsPerVm; }
    public void setMipsPerVm(int mipsPerVm) { this.mipsPerVm = mipsPerVm; }
    public int getRamPerVm() { return ramPerVm; }
    public void setRamPerVm(int ramPerVm) { this.ramPerVm = ramPerVm; }
    public int getBandwidthPerVm() { return bandwidthPerVm; }
    public void setBandwidthPerVm(int bandwidthPerVm) { this.bandwidthPerVm = bandwidthPerVm; }
    public int getPesPerVm() { return pesPerVm; }
    public void setPesPerVm(int pesPerVm) { this.pesPerVm = pesPerVm; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private int numVms;
        private int mipsPerVm;
        private int ramPerVm;
        private int bandwidthPerVm;
        private int pesPerVm;

        public Builder name(String name) { this.name = name; return this; }
        public Builder numVms(int numVms) { this.numVms = numVms; return this; }
        public Builder mipsPerVm(int mipsPerVm) { this.mipsPerVm = mipsPerVm; return this; }
        public Builder ramPerVm(int ramPerVm) { this.ramPerVm = ramPerVm; return this; }
        public Builder bandwidthPerVm(int bandwidthPerVm) { this.bandwidthPerVm = bandwidthPerVm; return this; }
        public Builder pesPerVm(int pesPerVm) { this.pesPerVm = pesPerVm; return this; }
        public VmConfigDTO build() {
            return new VmConfigDTO(name, numVms, mipsPerVm, ramPerVm, bandwidthPerVm, pesPerVm);
        }
    }
}
