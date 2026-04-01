package com.busbooking.service;

import com.busbooking.dto.BusResponseDto;
import com.busbooking.entity.Bus;
import com.busbooking.entity.Seat;
import com.busbooking.exception.CustomException;
import com.busbooking.repository.BusRepository;
import com.busbooking.repository.SeatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BusService {

    private final BusRepository busRepository;
    private final SeatRepository seatRepository;

    public BusService(BusRepository busRepository, SeatRepository seatRepository) {
        this.busRepository = busRepository;
        this.seatRepository = seatRepository;
    }

    public List<BusResponseDto> getAllBuses() {
        return busRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public List<BusResponseDto> searchBuses(String source, String destination, LocalDate date) {
        LocalTime departureTime = date != null ? LocalTime.now() : null;
        List<Bus> buses = busRepository.searchBuses(source, destination, departureTime);
        return buses.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public BusResponseDto getBusById(Long busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new CustomException("Bus not found with id: " + busId));
        return convertToResponseDto(bus);
    }

    public List<BusResponseDto.SeatResponseDto> getBusSeats(Long busId) {
        List<Seat> seats = seatRepository.findByBusBusId(busId);
        if (seats.isEmpty()) {
            throw new CustomException("No seats found for bus with id: " + busId);
        }
        return seats.stream()
                .map(seat -> new BusResponseDto.SeatResponseDto(
                        seat.getSeatId(),
                        seat.getSeatNumber(),
                        seat.getIsAvailable()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public BusResponseDto createBus(BusResponseDto busDto) {
        // Check if bus with same name already exists
        if (busRepository.existsByBusName(busDto.getBusName())) {
            throw new CustomException("Bus with name '" + busDto.getBusName() + "' already exists");
        }

        Bus bus = new Bus();
        bus.setBusName(busDto.getBusName());
        bus.setSource(busDto.getSource());
        bus.setDestination(busDto.getDestination());
        bus.setDepartureTime(busDto.getDepartureTime());
        bus.setArrivalTime(busDto.getArrivalTime());
        bus.setTotalSeats(busDto.getTotalSeats());

        Bus savedBus = busRepository.save(bus);

        // Create seats for the bus
        for (int i = 1; i <= savedBus.getTotalSeats(); i++) {
            Seat seat = new Seat();
            seat.setBus(savedBus);
            seat.setSeatNumber("S" + i);
            seat.setIsAvailable(true);
            seatRepository.save(seat);
        }

        return convertToResponseDto(savedBus);
    }

    @Transactional
    public BusResponseDto updateBus(Long busId, BusResponseDto busDto) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new CustomException("Bus not found with id: " + busId));

        // Check if another bus has the same name
        if (!bus.getBusName().equals(busDto.getBusName()) && 
            busRepository.existsByBusName(busDto.getBusName())) {
            throw new CustomException("Bus with name '" + busDto.getBusName() + "' already exists");
        }

        bus.setBusName(busDto.getBusName());
        bus.setSource(busDto.getSource());
        bus.setDestination(busDto.getDestination());
        bus.setDepartureTime(busDto.getDepartureTime());
        bus.setArrivalTime(busDto.getArrivalTime());
        bus.setTotalSeats(busDto.getTotalSeats());

        Bus savedBus = busRepository.save(bus);
        return convertToResponseDto(savedBus);
    }

    @Transactional
    public void deleteBus(Long busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new CustomException("Bus not found with id: " + busId));

        // Check if there are any bookings for this bus
        if (!bus.getBookings().isEmpty()) {
            throw new CustomException("Cannot delete bus with existing bookings");
        }

        busRepository.delete(bus);
    }

    public Map<String, Object> getBusAnalytics() {
        List<Bus> allBuses = busRepository.findAll();
        
        long totalBuses = allBuses.size();
        long totalSeats = allBuses.stream().mapToLong(Bus::getTotalSeats).sum();
        long availableSeats = allBuses.stream()
                .flatMap(bus -> bus.getSeats().stream())
                .filter(Seat::getIsAvailable)
                .count();
        
        return Map.of(
            "totalBuses", totalBuses,
            "totalSeats", totalSeats,
            "availableSeats", availableSeats,
            "occupiedSeats", totalSeats - availableSeats
        );
    }

    private BusResponseDto convertToResponseDto(Bus bus) {
        BusResponseDto dto = new BusResponseDto();
        dto.setBusId(bus.getBusId());
        dto.setBusName(bus.getBusName());
        dto.setSource(bus.getSource());
        dto.setDestination(bus.getDestination());
        dto.setDepartureTime(bus.getDepartureTime());
        dto.setArrivalTime(bus.getArrivalTime());
        dto.setTotalSeats(bus.getTotalSeats());

        List<BusResponseDto.SeatResponseDto> seatDtos = bus.getSeats().stream()
                .map(seat -> new BusResponseDto.SeatResponseDto(
                        seat.getSeatId(),
                        seat.getSeatNumber(),
                        seat.getIsAvailable()
                ))
                .collect(Collectors.toList());
        dto.setSeats(seatDtos);

        return dto;
    }
}