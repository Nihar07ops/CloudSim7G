package com.cloudsim7g.service;

import com.cloudsim7g.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.cloudbus.cloudsim.brokers.DatacenterBroker;
import org.cloudbus.cloudsim.brokers.DatacenterBrokerSimple;
import org.cloudbus.cloudsim.cloudlets.Cloudlet;
import org.cloudbus.cloudsim.cloudlets.CloudletSimple;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.datacenters.Datacenter;
import org.cloudbus.cloudsim.datacenters.DatacenterSimple;
import org.cloudbus.cloudsim.hosts.Host;
import org.cloudbus.cloudsim.hosts.HostSimple;
import org.cloudbus.cloudsim.resources.Pe;
import org.cloudbus.cloudsim.resources.PeSimple;
import org.cloudbus.cloudsim.schedulers.cloudlet.CloudletSchedulerTimeShared;
import org.cloudbus.cloudsim.schedulers.vm.VmSchedulerTimeShared;
import org.cloudbus.cloudsim.utilizationmodels.UtilizationModelDynamic;
import org.cloudbus.cloudsim.vms.Vm;
import org.cloudbus.cloudsim.vms.VmSimple;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SimulationService {

    private static final Logger log = LoggerFactory.getLogger(SimulationService.class);

    /**
     * Runs a complete CloudSim simulation based on the provided configuration
     */
    public SimulationResultDTO runSimulation(SimulationConfigDTO config) {
        long startTime = System.currentTimeMillis();
        
        try {
            log.info("Starting simulation: {}", config.getSimulationName());
            
            // Validate configuration
            if (config.getDatacenterConfig() == null) {
                throw new IllegalArgumentException("Datacenter configuration is required");
            }
            if (config.getVmConfig() == null) {
                throw new IllegalArgumentException("VM configuration is required");
            }
            if (config.getCloudletConfig() == null) {
                throw new IllegalArgumentException("Cloudlet configuration is required");
            }
            
            // Add safety limits to prevent OutOfMemoryErrors
            if (config.getVmConfig().getNumVms() > 1000) {
                throw new IllegalArgumentException("Maximum number of VMs allowed is 1000 to prevent system instability.");
            }
            if (config.getCloudletConfig().getNumCloudlets() > 10000) {
                throw new IllegalArgumentException("Maximum number of Cloudlets allowed is 10,000 to prevent memory exhaustion.");
            }
            if (config.getDatacenterConfig().getNumHosts() > 500) {
                throw new IllegalArgumentException("Maximum number of Hosts allowed is 500.");
            }
            
            // Create a new CloudSim instance
            CloudSim cloudsim = new CloudSim();
            
            // Create datacenter
            Datacenter datacenter = createDatacenter(cloudsim, config.getDatacenterConfig());
            
            // Create broker
            DatacenterBroker broker = new DatacenterBrokerSimple(cloudsim);
            
            // Create VMs
            List<Vm> vmList = createVms(config.getVmConfig());
            broker.submitVmList(vmList);
            
            // Create Cloudlets (tasks/workloads)
            List<Cloudlet> cloudletList = createCloudlets(config.getCloudletConfig());
            broker.submitCloudletList(cloudletList);
            
            log.info("Submitted {} VMs and {} cloudlets to broker", vmList.size(), cloudletList.size());
            
            // Run the simulation
            cloudsim.start();
            
            // Collect and process results
            SimulationResultDTO result = processResults(broker, config, startTime);
            
            log.info("Simulation completed: {}", config.getSimulationName());
            
            return result;
            
        } catch (Exception e) {
            log.error("Error running simulation: {}", e.getMessage(), e);
            throw new RuntimeException("Simulation failed: " + e.getMessage(), e);
        }
    }

    /**
     * Creates the datacenter with hosts
     */
    private Datacenter createDatacenter(CloudSim cloudsim, DatacenterConfigDTO config) {
        log.info("Creating datacenter: {} with {} hosts", config.getName(), config.getNumHosts());
        
        List<Host> hostList = new ArrayList<>();
        
        for (int i = 0; i < config.getNumHosts(); i++) {
            Host host = createHost(config, i);
            hostList.add(host);
        }
        
        return new DatacenterSimple(cloudsim, hostList);
    }

    /**
     * Creates a single host with processing elements
     */
    private Host createHost(DatacenterConfigDTO config, int hostId) {
        List<Pe> peList = new ArrayList<>();
        
        // Create PEs (processing elements) - typically 1 per core
        for (int i = 0; i < 4; i++) { // 4 cores per host
            peList.add(new PeSimple(config.getMipsPerHost()));
        }
        
        Host host = new HostSimple(config.getRamPerHost(), config.getBandwidthPerHost(), 
                100000, peList); // 100GB storage
        
        return host;
    }

    /**
     * Creates Virtual Machines
     */
    private List<Vm> createVms(VmConfigDTO config) {
        log.info("Creating {} VMs", config.getNumVms());
        
        List<Vm> vmList = new ArrayList<>();
        
        for (int i = 0; i < config.getNumVms(); i++) {
            Vm vm = new VmSimple(
                    config.getMipsPerVm(),
                    config.getPesPerVm()
            );
            vm.setRam(config.getRamPerVm());
            vm.setBw(config.getBandwidthPerVm());
            vm.setSize(10000); // 10GB storage
            
            vmList.add(vm);
        }
        
        return vmList;
    }

    /**
     * Creates Cloudlets (tasks/workloads)
     */
    private List<Cloudlet> createCloudlets(CloudletConfigDTO config) {
        log.info("Creating {} cloudlets", config.getNumCloudlets());
        
        List<Cloudlet> cloudletList = new ArrayList<>();
        UtilizationModelDynamic utilizationModel = new UtilizationModelDynamic(0.5);
        
        for (int i = 0; i < config.getNumCloudlets(); i++) {
            Cloudlet cloudlet = new CloudletSimple(
                    i,
                    config.getExecutionLength(),
                    config.getNumPes()
            );
            cloudlet.setUtilizationModel(utilizationModel);
            
            cloudletList.add(cloudlet);
        }
        
        return cloudletList;
    }

    /**
     * Processes simulation results
     */
    private SimulationResultDTO processResults(DatacenterBroker broker, 
                                               SimulationConfigDTO config, 
                                               long startTime) {
        long simulationDuration = System.currentTimeMillis() - startTime;
        
        List<Cloudlet> finishedCloudlets = broker.getCloudletFinishedList();
        List<Vm> vms = broker.getVmExecList();
        
        double totalExecutionTime = 0;
        double totalCost = 0;
        int successfulCloudlets = 0;
        
        for (Cloudlet cloudlet : finishedCloudlets) {
            totalExecutionTime += cloudlet.getActualCpuTime();
            // Realistic AWS-style pricing: ~$0.04 per hour for a standard VM -> ~$0.000011 per CPU second
            totalCost += (cloudlet.getActualCpuTime() * 0.000011); 
            if (cloudlet.getStatus() == Cloudlet.Status.SUCCESS) {
                successfulCloudlets++;
            }
        }
        
        double averageExecutionTime = finishedCloudlets.isEmpty() ? 0 
                : totalExecutionTime / finishedCloudlets.size();
        
        double averageCpuUtilization = calculateAverageCpuUtilization(vms, finishedCloudlets);
        
        SimulationResultDTO result = SimulationResultDTO.builder()
                .simulationId(UUID.randomUUID().toString())
                .simulationName(config.getSimulationName())
                .totalExecutionTime(totalExecutionTime)
                .totalCloudlets(finishedCloudlets.size())
                .successfulCloudlets(successfulCloudlets)
                .averageCloudletExecutionTime(averageExecutionTime)
                .totalCostOfExecution(totalCost)
                .totalWattHoursOfEnergy(calculateTotalEnergy(vms, totalExecutionTime))
                .averageCpuUtilization(averageCpuUtilization)
                .averageRamUtilization(0.5) // Placeholder
                .simulationDuration(simulationDuration)
                .build();
        
        log.info("Results - Total Execution Time: {}, Successful Cloudlets: {}/{}", 
                totalExecutionTime, successfulCloudlets, finishedCloudlets.size());
        
        return result;
    }

    /**
     * Calculates average CPU utilization across all VMs
     */
    private double calculateAverageCpuUtilization(List<Vm> vms, List<Cloudlet> cloudlets) {
        if (vms.isEmpty()) return 0;
        
        return vms.stream()
                .mapToDouble(vm -> vm.getCpuPercentUtilization())
                .average()
                .orElse(0);
    }

    /**
     * Calculates total energy consumption
     */
    private double calculateTotalEnergy(List<Vm> vms, double totalExecutionTimeSeconds) {
        // Realistic energy model: Average server draws ~200 Watts when active.
        // Energy in Watt-hours = (Watts * Hours)
        // Convert total CPU seconds to hours, multiply by average power draw
        double totalExecutionHours = totalExecutionTimeSeconds / 3600.0;
        return (vms.size() > 0 ? (totalExecutionHours * 200.0) : 0);
    }
}
