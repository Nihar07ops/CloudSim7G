package com.cloudsim7g.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cloudsim7g.dto.SimulationConfigDTO;
import com.cloudsim7g.dto.SimulationResultDTO;
import com.cloudsim7g.service.SimulationService;

@RestController
@RequestMapping("/api/simulations")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class SimulationController {

    private static final Logger log = LoggerFactory.getLogger(SimulationController.class);

    private final SimulationService simulationService;
    private final Map<String, SimulationResultDTO> simulationResults = new HashMap<>();

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "CloudSim 7G Backend is running"));
    }

    /**
     * Run a new simulation
     */
    @PostMapping("/run")
    public ResponseEntity<SimulationResultDTO> runSimulation(@RequestBody SimulationConfigDTO config) {

        try {

            System.out.println("\n=================================================");
            System.out.println("        CLOUDSIM 7G SIMULATION STARTED");
            System.out.println("=================================================");

            System.out.println("Simulation Name      : " + config.getSimulationName());

            System.out.println("\n[DATACENTER CONFIGURATION]");
            System.out.println("Hosts                : " + config.getDatacenterConfig().getNumHosts());
            System.out.println("MIPS per Host        : " + config.getDatacenterConfig().getMipsPerHost());
            System.out.println("RAM per Host         : " + config.getDatacenterConfig().getRamPerHost());
            System.out.println("Bandwidth per Host   : " + config.getDatacenterConfig().getBandwidthPerHost());

            System.out.println("\n[VIRTUAL MACHINE CONFIGURATION]");
            System.out.println("Number of VMs        : " + config.getVmConfig().getNumVms());
            System.out.println("MIPS per VM          : " + config.getVmConfig().getMipsPerVm());
            System.out.println("RAM per VM           : " + config.getVmConfig().getRamPerVm());

            System.out.println("\n[CLOUDLET CONFIGURATION]");
            System.out.println("Cloudlets            : " + config.getCloudletConfig().getNumCloudlets());
            System.out.println("Execution Length     : " + config.getCloudletConfig().getExecutionLength());

            System.out.println("\n[SIMULATION PROCESS]");
            System.out.println("Initializing CloudSim Environment...");
            System.out.println("Creating Datacenter...");
            System.out.println("Allocating Hosts...");
            System.out.println("Deploying Virtual Machines...");
            System.out.println("Submitting Cloudlets to Broker...");
            System.out.println("Running Simulation...");
            System.out.println("Processing Tasks...");

            log.info("Received simulation request: {}", config.getSimulationName());

            SimulationResultDTO result = simulationService.runSimulation(config);

            // Store result for later retrieval
            simulationResults.put(result.getSimulationId(), result);

            System.out.println("\n[SIMULATION COMPLETED SUCCESSFULLY]");
            System.out.println("Simulation ID        : " + result.getSimulationId());
            System.out.println("Execution Time       : " +
                    String.format("%.2f", result.getTotalExecutionTime()) + " seconds");
            System.out.println("Total Cost           : $" +
                    String.format("%.2f", result.getTotalCostOfExecution()));
            System.out.println("Cloudlets Processed  : " +
                    result.getSuccessfulCloudlets() + "/" + result.getTotalCloudlets());

            System.out.println("=================================================\n");

            return ResponseEntity.ok(result);

        } catch (Exception e) {

            System.out.println("\n[SIMULATION FAILED]");
            System.out.println("Error: " + e.getMessage());

            log.error("Error running simulation", e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get a specific simulation result by ID
     */
    @GetMapping("/{simulationId}")
    public ResponseEntity<SimulationResultDTO> getSimulationResult(@PathVariable String simulationId) {

        SimulationResultDTO result = simulationResults.get(simulationId);

        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get all simulation results
     */
    @GetMapping
    public ResponseEntity<List<SimulationResultDTO>> getAllResults() {

        List<SimulationResultDTO> results =
                new ArrayList<>(simulationResults.values());

        return ResponseEntity.ok(results);
    }

    /**
     * Get simulation statistics
     */
    @GetMapping("/stats/summary")
    public ResponseEntity<Map<String, Object>> getStatsSummary() {

        List<SimulationResultDTO> results =
                new ArrayList<>(simulationResults.values());

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalSimulations", results.size());

        stats.put("averageExecutionTime",
                results.stream()
                        .mapToDouble(SimulationResultDTO::getTotalExecutionTime)
                        .average()
                        .orElse(0));

        stats.put("averageCost",
                results.stream()
                        .mapToDouble(SimulationResultDTO::getTotalCostOfExecution)
                        .average()
                        .orElse(0));

        stats.put("totalCloudlets",
                results.stream()
                        .mapToInt(SimulationResultDTO::getTotalCloudlets)
                        .sum());

        stats.put("successRate",
                results.stream()
                        .mapToDouble(r ->
                                r.getSuccessfulCloudlets() /
                                        (double) Math.max(1, r.getTotalCloudlets()))
                        .average()
                        .orElse(0));

        return ResponseEntity.ok(stats);
    }

    /**
     * Delete a simulation result
     */
    @DeleteMapping("/{simulationId}")
    public ResponseEntity<Void> deleteSimulation(@PathVariable String simulationId) {

        if (simulationResults.remove(simulationId) != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Clear all simulation results
     */
    @DeleteMapping
    public ResponseEntity<Void> clearAllResults() {

        simulationResults.clear();

        log.info("All simulation results cleared");

        return ResponseEntity.ok().build();
    }

    /**
     * Get recommended configuration template for quick start
     */
    @GetMapping("/template/quick-start")
    public ResponseEntity<SimulationConfigDTO> getQuickStartTemplate() {

        SimulationConfigDTO template = SimulationConfigDTO.builder()
                .simulationName("Quick Start Simulation")

                .datacenterConfig(
                        com.cloudsim7g.dto.DatacenterConfigDTO.builder()
                                .name("Datacenter1")
                                .numHosts(4)
                                .mipsPerHost(20000)
                                .ramPerHost(16000)
                                .bandwidthPerHost(1000)
                                .schedulingPolicy("TimeShared")
                                .vmAllocationPolicy("BestFit")
                                .build()
                )

                .vmConfig(
                        com.cloudsim7g.dto.VmConfigDTO.builder()
                                .name("VM1")
                                .numVms(2)
                                .mipsPerVm(10000)
                                .ramPerVm(4096)
                                .bandwidthPerVm(500)
                                .pesPerVm(2)
                                .build()
                )

                .cloudletConfig(
                        com.cloudsim7g.dto.CloudletConfigDTO.builder()
                                .name("Cloudlet1")
                                .numCloudlets(10)
                                .executionLength(400000)
                                .numPes(2)
                                .mipsPerPe(10000)
                                .build()
                )

                .enableNetworkSimulation(false)
                .enablePowerAwareness(false)
                .enableContainers(false)
                .build();

        return ResponseEntity.ok(template);
    }
}