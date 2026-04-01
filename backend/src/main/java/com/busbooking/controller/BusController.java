package com.busbooking.controller;

import com.busbooking.dto.BusResponseDto;
import com.busbooking.service.BusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearer-jwt")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    @Operation(summary = "Get all buses", description = "Get all buses in the system (Admin and Bus Manager only)")
    @PreAuthorize("hasAnyRole('BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<List<BusResponseDto>> getAllBuses() {
        return ResponseEntity.ok(busService.getAllBuses());
    }

    @GetMapping("/search")
    @Operation(summary = "Search buses", description = "Search buses by source, destination, and date (All authenticated users)")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<List<BusResponseDto>> searchBuses(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(busService.searchBuses(source, destination, date));
    }

    @GetMapping("/{busId}")
    @Operation(summary = "Get bus by ID", description = "Get bus details by ID (All authenticated users)")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BusResponseDto> getBusById(@PathVariable Long busId) {
        return ResponseEntity.ok(busService.getBusById(busId));
    }

    @GetMapping("/{busId}/seats")
    @Operation(summary = "Get bus seats", description = "Get seat layout for a specific bus (All authenticated users)")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<List<BusResponseDto.SeatResponseDto>> getBusSeats(@PathVariable Long busId) {
        return ResponseEntity.ok(busService.getBusSeats(busId));
    }

    @PostMapping
    @Operation(summary = "Create new bus", description = "Add a new bus to the system (Bus Manager and Admin only)")
    @PreAuthorize("hasAnyRole('BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BusResponseDto> createBus(@RequestBody BusResponseDto busDto) {
        return ResponseEntity.ok(busService.createBus(busDto));
    }

    @PutMapping("/{busId}")
    @Operation(summary = "Update bus", description = "Update bus details (Bus Manager and Admin only)")
    @PreAuthorize("hasAnyRole('BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BusResponseDto> updateBus(@PathVariable Long busId, @RequestBody BusResponseDto busDto) {
        return ResponseEntity.ok(busService.updateBus(busId, busDto));
    }

    @DeleteMapping("/{busId}")
    @Operation(summary = "Delete bus", description = "Delete a bus from the system (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBus(@PathVariable Long busId) {
        busService.deleteBus(busId);
        return ResponseEntity.ok("Bus deleted successfully");
    }

    @GetMapping("/analytics")
    @Operation(summary = "Get bus analytics", description = "Get bus statistics and analytics (Bus Manager and Admin only)")
    @PreAuthorize("hasAnyRole('BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<?> getBusAnalytics() {
        return ResponseEntity.ok(busService.getBusAnalytics());
    }
}
