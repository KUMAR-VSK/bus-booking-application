package com.busbooking.service;

import com.busbooking.dto.*;
import com.busbooking.entity.*;
import com.busbooking.exception.CustomException;
import com.busbooking.repository.*;
import com.busbooking.security.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingWorkflowService {

    private final BusRepository busRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final JwtUtil jwtUtil;

    // In-memory storage for seat holds (in production, use Redis)
    private final Map<String, SeatHoldInfo> seatHolds = new HashMap<>();

    public BookingWorkflowService(BusRepository busRepository, SeatRepository seatRepository,
                                UserRepository userRepository, BookingRepository bookingRepository,
                                BookingSeatRepository bookingSeatRepository, JwtUtil jwtUtil) {
        this.busRepository = busRepository;
        this.seatRepository = seatRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.jwtUtil = jwtUtil;
    }

    public List<BusSearchResultDto> searchBuses(BusSearchRequestDto searchRequest) {
        List<Bus> buses = busRepository.searchBuses(
            searchRequest.getSource(), 
            searchRequest.getDestination(), 
            null
        );

        return buses.stream()
            .map(bus -> convertToSearchResultDto(bus, searchRequest))
            .sorted(getComparator(searchRequest.getSortBy(), searchRequest.getSortOrder()))
            .collect(Collectors.toList());
    }

    public BusSearchResultDto getBusDetails(Long busId, LocalDate travelDate) {
        Bus bus = busRepository.findById(busId)
            .orElseThrow(() -> new CustomException("Bus not found with id: " + busId));
        
        BusSearchResultDto result = convertToSearchResultDto(bus, 
            new BusSearchRequestDto(bus.getSource(), bus.getDestination(), travelDate, 1, "departure", "asc"));
        
        // Add detailed information
        result.setBusType("AC"); // Default, can be enhanced
        result.setAmenities(Arrays.asList("WiFi", "Charging Points", "Water Bottle", "Blanket"));
        result.setOperatorName("Express Travels");
        result.setRating(4.2);
        
        return result;
    }

    public List<BusSearchResultDto.SeatInfoDto> getSeatAvailability(Long busId, LocalDate travelDate) {
        List<Seat> seats = seatRepository.findByBusBusId(busId);
        
        return seats.stream()
            .map(seat -> new BusSearchResultDto.SeatInfoDto(
                seat.getSeatId(),
                seat.getSeatNumber(),
                seat.getIsAvailable(),
                "WINDOW", // Can be enhanced to store seat type
                100.0, // Price per seat
                false // Can be enhanced to store seat preferences
            ))
            .collect(Collectors.toList());
    }

    public SeatHoldResponseDto holdSeats(SeatHoldRequestDto holdRequest) {
        // Check if seats are available
        List<Seat> seats = seatRepository.findByBusBusIdAndSeatNumberIn(
            holdRequest.getBusId(), 
            holdRequest.getSeatNumbers()
        );

        // Check if any seats are already held or booked
        for (Seat seat : seats) {
            if (!seat.getIsAvailable()) {
                throw new CustomException("Seat " + seat.getSeatNumber() + " is not available");
            }
        }

        // Create hold
        String holdId = generateHoldId();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(15);
        
        SeatHoldInfo holdInfo = new SeatHoldInfo(
            holdId, 
            holdRequest.getBusId(), 
            holdRequest.getTravelDate(), 
            holdRequest.getSeatNumbers(), 
            holdRequest.getUserEmail(), 
            expiryTime
        );
        
        seatHolds.put(holdId, holdInfo);

        // Mark seats as held in database
        for (Seat seat : seats) {
            seat.setIsAvailable(false);
            seatRepository.save(seat);
        }

        return new SeatHoldResponseDto(
            holdId, 
            holdRequest.getSeatNumbers(), 
            expiryTime, 
            holdRequest.getBusId(), 
            holdRequest.getTravelDate(), 
            "HELD"
        );
    }

    public void releaseSeats(SeatReleaseRequestDto releaseRequest) {
        SeatHoldInfo holdInfo = seatHolds.get(releaseRequest.getHoldId());
        if (holdInfo != null) {
            // Release seats in database
            List<Seat> seats = seatRepository.findByBusBusIdAndSeatNumberIn(
                releaseRequest.getBusId(), 
                releaseRequest.getSeatNumbers()
            );
            
            for (Seat seat : seats) {
                seat.setIsAvailable(true);
                seatRepository.save(seat);
            }
            
            seatHolds.remove(releaseRequest.getHoldId());
        }
    }

    public BookingInitiationResponseDto initiateBooking(BookingInitiationRequestDto initiationRequest) {
        // Validate seat hold
        SeatHoldInfo holdInfo = findValidHold(initiationRequest.getBusId(), 
                                           initiationRequest.getTravelDate(), 
                                           initiationRequest.getSelectedSeats());
        
        if (holdInfo == null) {
            throw new CustomException("No valid seat hold found or hold has expired");
        }

        // Calculate pricing
        Double baseFare = initiationRequest.getSelectedSeats().size() * 100.0;
        Double taxesAndFees = baseFare * 0.18; // 18% GST
        Double totalAmount = baseFare + taxesAndFees;

        // Create temporary booking
        String bookingReference = generateBookingReference();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(15);

        BookingInitiationResponseDto response = new BookingInitiationResponseDto(
            null, // Will be set after payment
            bookingReference,
            UUID.randomUUID().toString(),
            baseFare,
            taxesAndFees,
            totalAmount,
            expiryTime,
            "SEATS_HELD"
        );
        
        response.setSelectedSeats(initiationRequest.getSelectedSeats());
        response.setPaymentUrl("https://payment-gateway.com/pay/" + bookingReference);

        return response;
    }

    public PaymentResponseDto processPayment(PaymentRequestDto paymentRequest) {
        // Simulate payment processing
        String paymentId = generatePaymentId();
        LocalDateTime paymentDate = LocalDateTime.now();
        
        // In real implementation, integrate with payment gateway
        boolean paymentSuccess = simulatePaymentGateway(paymentRequest);
        
        PaymentResponseDto response = new PaymentResponseDto(
            paymentId,
            paymentRequest.getBookingId(),
            paymentSuccess ? "SUCCESS" : "FAILED",
            "TXN" + System.currentTimeMillis(),
            paymentRequest.getAmount(),
            paymentRequest.getCurrency(),
            paymentRequest.getPaymentMethod(),
            paymentDate
        );

        if (!paymentSuccess) {
            response.setErrorMessage("Payment processing failed. Please try again.");
        }

        return response;
    }

    public BookingWorkflowDto confirmBooking(String paymentId) {
        // In real implementation, verify payment and create booking
        // For now, simulate booking confirmation
        
        String bookingReference = generateBookingReference();
        String pnrNumber = generatePnrNumber();
        
        BookingWorkflowDto booking = new BookingWorkflowDto();
        booking.setBookingId(System.currentTimeMillis());
        booking.setBookingReference(bookingReference);
        booking.setPnrNumber(pnrNumber);
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentStatus("COMPLETED");
        booking.setBookingDate(LocalDate.now());
        
        return booking;
    }

    public BookingWorkflowDto getBookingDetails(String bookingReference) {
        // In real implementation, fetch from database
        // For now, return mock data
        BookingWorkflowDto booking = new BookingWorkflowDto();
        booking.setBookingReference(bookingReference);
        booking.setBookingId(System.currentTimeMillis());
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentStatus("COMPLETED");
        booking.setBookingDate(LocalDate.now());
        
        return booking;
    }

    public List<BookingWorkflowDto> getMyBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        
        // In real implementation, fetch user's bookings from database
        // For now, return empty list
        return new ArrayList<>();
    }

    public CancellationResponseDto cancelBooking(String bookingReference) {
        String cancellationId = generateCancellationId();
        LocalDateTime cancellationDate = LocalDateTime.now();
        
        CancellationResponseDto response = new CancellationResponseDto(
            bookingReference,
            "SUCCESS",
            cancellationId,
            cancellationDate
        );
        
        response.setRefundAmount(800.0); // Example refund amount
        response.setRefundStatus("PROCESSING");
        response.setRefundId("REF" + System.currentTimeMillis());
        response.setExpectedRefundDate(LocalDateTime.now().plusDays(5));
        response.setCancellationCharges(200.0);
        response.setRefundMethod("ORIGINAL");
        response.setProcessingDays(5);
        
        return response;
    }

    public BookingTrackingDto trackBooking(String bookingReference) {
        BookingTrackingDto tracking = new BookingTrackingDto();
        tracking.setBookingReference(bookingReference);
        tracking.setBookingStatus("CONFIRMED");
        tracking.setPaymentStatus("COMPLETED");
        tracking.setBookingDate(LocalDateTime.now().minusDays(2));
        tracking.setLastUpdated(LocalDateTime.now());
        tracking.setCurrentStep("CONFIRMATION");
        tracking.setCurrentStepNumber(5);
        
        // Add tracking steps
        List<BookingTrackingDto.TrackingStepDto> steps = Arrays.asList(
            new BookingTrackingDto.TrackingStepDto("SEARCH", "COMPLETED", LocalDateTime.now().minusDays(2).minusHours(2), "Searched for buses"),
            new BookingTrackingDto.TrackingStepDto("SEAT_SELECTION", "COMPLETED", LocalDateTime.now().minusDays(2).minusHours(1), "Selected seats"),
            new BookingTrackingDto.TrackingStepDto("PASSENGER_DETAILS", "COMPLETED", LocalDateTime.now().minusDays(2).minusMinutes(30), "Entered passenger details"),
            new BookingTrackingDto.TrackingStepDto("PAYMENT", "COMPLETED", LocalDateTime.now().minusDays(2).minusMinutes(15), "Payment completed"),
            new BookingTrackingDto.TrackingStepDto("CONFIRMATION", "COMPLETED", LocalDateTime.now().minusDays(2), "Booking confirmed")
        );
        
        tracking.setTrackingSteps(steps);
        
        // Add bus location
        BookingTrackingDto.BusLocationDto busLocation = new BookingTrackingDto.BusLocationDto();
        busLocation.setLatitude(28.6139);
        busLocation.setLongitude(77.2090);
        busLocation.setCurrentLocation("Delhi - Gurgaon Highway");
        busLocation.setLastUpdated(LocalDateTime.now().minusMinutes(5).format(DateTimeFormatter.ofPattern("HH:mm")));
        busLocation.setSpeed(65.0);
        busLocation.setNextStop("Gurgaon Sector 29");
        busLocation.setDistanceToNextStop(15);
        busLocation.setEstimatedTimeToNextStop(12);
        
        tracking.setBusLocation(busLocation);
        tracking.setEstimatedArrivalTime("14:30");
        tracking.setDelayInformation("Running 15 minutes behind schedule");
        
        return tracking;
    }

    public BusTrackingDto trackBus(Long busId) {
        BusTrackingDto busTracking = new BusTrackingDto();
        busTracking.setBusId(busId);
        busTracking.setBusName("Express Travels - Delhi to Jaipur");
        busTracking.setBusNumber("EX-2024");
        busTracking.setCurrentStatus("DELAYED");
        busTracking.setLatitude(28.6139);
        busTracking.setLongitude(77.2090);
        busTracking.setCurrentLocation("Delhi - Gurgaon Highway");
        busTracking.setLastUpdated(LocalDateTime.now().minusMinutes(5).format(DateTimeFormatter.ofPattern("HH:mm")));
        busTracking.setSpeed(65.0);
        busTracking.setNextStop("Gurgaon Sector 29");
        busTracking.setDistanceToNextStop(15);
        busTracking.setEstimatedTimeToNextStop(12);
        busTracking.setSource("Delhi");
        busTracking.setDestination("Jaipur");
        busTracking.setScheduledDepartureTime("08:00");
        busTracking.setScheduledArrivalTime("14:00");
        busTracking.setActualDepartureTime("08:15");
        busTracking.setEstimatedArrivalTime("14:15");
        busTracking.setDelayInformation("Running 15 minutes behind schedule due to traffic");
        busTracking.setOccupancyRate(75);
        busTracking.setDriverName("Rajesh Kumar");
        busTracking.setDriverPhone("+91-98765-43210");
        
        // Add upcoming stops
        List<BusTrackingDto.BusStopDto> stops = Arrays.asList(
            createBusStop("Gurgaon Sector 29", "09:00", "09:12", null, "PENDING", 1, 25.0),
            createBusStop("Gurgaon Bus Stand", "09:15", "09:28", null, "PENDING", 2, 8.0),
            createBusStop("Manesar", "09:45", "09:58", null, "PENDING", 3, 15.0),
            createBusStop("Neemrana", "11:00", "11:15", null, "PENDING", 4, 45.0),
            createBusStop("Jaipur", "14:00", "14:15", null, "PENDING", 5, 120.0)
        );
        
        busTracking.setUpcomingStops(stops);
        
        return busTracking;
    }

    public byte[] downloadTicket(String bookingReference) {
        // In real implementation, generate PDF ticket
        // For now, return mock PDF data
        return "MOCK_PDF_TICKET_DATA".getBytes();
    }

    public void sendTicketEmail(String bookingReference) {
        // In real implementation, send email with ticket attachment
        // For now, just log the action
        System.out.println("Sending ticket email for booking: " + bookingReference);
    }

    // Helper methods
    private BusSearchResultDto convertToSearchResultDto(Bus bus, BusSearchRequestDto searchRequest) {
        BusSearchResultDto result = new BusSearchResultDto();
        result.setBusId(bus.getBusId());
        result.setBusName(bus.getBusName());
        result.setSource(bus.getSource());
        result.setDestination(bus.getDestination());
        result.setDepartureTime(bus.getDepartureTime());
        result.setArrivalTime(bus.getArrivalTime());
        result.setTotalSeats(bus.getTotalSeats());
        
        // Calculate available seats
        long availableSeats = bus.getSeats().stream()
            .filter(Seat::getIsAvailable)
            .count();
        result.setAvailableSeats((int) availableSeats);
        
        // Calculate duration
        double duration = ChronoUnit.MINUTES.between(bus.getDepartureTime(), bus.getArrivalTime()) / 60.0;
        result.setDuration(duration);
        
        // Set pricing
        Double pricePerSeat = 100.0; // Default price
        result.setPricePerSeat(pricePerSeat);
        result.setTotalPrice(pricePerSeat * searchRequest.getPassengers());
        
        result.setTravelDate(searchRequest.getTravelDate());
        
        return result;
    }

    private Comparator<BusSearchResultDto> getComparator(String sortBy, String sortOrder) {
        // Handle null values
        sortBy = sortBy != null ? sortBy : "departure";
        sortOrder = sortOrder != null ? sortOrder : "asc";
        boolean ascending = "asc".equals(sortOrder);
        
        switch (sortBy) {
            case "price":
                return ascending ? Comparator.comparing(BusSearchResultDto::getTotalPrice) 
                               : Comparator.comparing(BusSearchResultDto::getTotalPrice).reversed();
            case "duration":
                return ascending ? Comparator.comparing(BusSearchResultDto::getDuration) 
                               : Comparator.comparing(BusSearchResultDto::getDuration).reversed();
            case "departure":
                return ascending ? Comparator.comparing(BusSearchResultDto::getDepartureTime) 
                               : Comparator.comparing(BusSearchResultDto::getDepartureTime).reversed();
            case "arrival":
                return ascending ? Comparator.comparing(BusSearchResultDto::getArrivalTime) 
                               : Comparator.comparing(BusSearchResultDto::getArrivalTime).reversed();
            default:
                return Comparator.comparing(BusSearchResultDto::getDepartureTime);
        }
    }

    private String generateHoldId() {
        return "HOLD_" + System.currentTimeMillis();
    }

    private String generateBookingReference() {
        return "BK" + System.currentTimeMillis();
    }

    private String generatePaymentId() {
        return "PAY" + System.currentTimeMillis();
    }

    private String generateCancellationId() {
        return "CAN" + System.currentTimeMillis();
    }

    private String generatePnrNumber() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    private SeatHoldInfo findValidHold(Long busId, LocalDate travelDate, List<String> seatNumbers) {
        return seatHolds.values().stream()
            .filter(hold -> hold.getBusId().equals(busId) && 
                          hold.getTravelDate().equals(travelDate) && 
                          hold.getSeatNumbers().containsAll(seatNumbers) &&
                          hold.getExpiryTime().isAfter(LocalDateTime.now()))
            .findFirst()
            .orElse(null);
    }

    private boolean simulatePaymentGateway(PaymentRequestDto paymentRequest) {
        // Simulate payment processing with 90% success rate
        return Math.random() > 0.1;
    }

    private BusTrackingDto.BusStopDto createBusStop(String stopName, String scheduledTime, 
                                                   String estimatedTime, String actualTime, 
                                                   String status, Integer stopOrder, Double distance) {
        BusTrackingDto.BusStopDto stop = new BusTrackingDto.BusStopDto();
        stop.setStopName(stopName);
        stop.setScheduledTime(scheduledTime);
        stop.setEstimatedTime(estimatedTime);
        stop.setActualTime(actualTime);
        stop.setStatus(status);
        stop.setStopOrder(stopOrder);
        stop.setDistanceFromPrevious(distance);
        return stop;
    }

    // Inner class for seat hold information
    private static class SeatHoldInfo {
        private String holdId;
        private Long busId;
        private LocalDate travelDate;
        private List<String> seatNumbers;
        private String userEmail;
        private LocalDateTime expiryTime;

        public SeatHoldInfo(String holdId, Long busId, LocalDate travelDate, 
                           List<String> seatNumbers, String userEmail, LocalDateTime expiryTime) {
            this.holdId = holdId;
            this.busId = busId;
            this.travelDate = travelDate;
            this.seatNumbers = seatNumbers;
            this.userEmail = userEmail;
            this.expiryTime = expiryTime;
        }

        // Getters
        public String getHoldId() { return holdId; }
        public Long getBusId() { return busId; }
        public LocalDate getTravelDate() { return travelDate; }
        public List<String> getSeatNumbers() { return seatNumbers; }
        public String getUserEmail() { return userEmail; }
        public LocalDateTime getExpiryTime() { return expiryTime; }
    }
}
