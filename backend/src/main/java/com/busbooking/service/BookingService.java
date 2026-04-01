package com.busbooking.service;

import com.busbooking.dto.BookingRequestDto;
import com.busbooking.dto.BookingResponseDto;
import com.busbooking.entity.*;
import com.busbooking.exception.CustomException;
import com.busbooking.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final BusRepository busRepository;

    public BookingService(BookingRepository bookingRepository,
                         BookingSeatRepository bookingSeatRepository,
                         SeatRepository seatRepository,
                         UserRepository userRepository,
                         BusRepository busRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.seatRepository = seatRepository;
        this.userRepository = userRepository;
        this.busRepository = busRepository;
    }

    public BookingResponseDto createBooking(BookingRequestDto bookingRequestDto) {
        // Validate user exists
        User user = userRepository.findById(bookingRequestDto.getUserId())
                .orElseThrow(() -> new CustomException("User not found with id: " + bookingRequestDto.getUserId()));

        // Validate bus exists
        Bus bus = busRepository.findById(bookingRequestDto.getBusId())
                .orElseThrow(() -> new CustomException("Bus not found with id: " + bookingRequestDto.getBusId()));

        // Validate seats are available
        List<Seat> seats = seatRepository.findAvailableSeatsBySeatIds(bookingRequestDto.getSeatIds());
        
        if (seats.size() != bookingRequestDto.getSeatIds().size()) {
            throw new CustomException("One or more seats are not available");
        }

        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBus(bus);
        booking.setBookingDate(bookingRequestDto.getBookingDate());
        booking.setTotalAmount(calculateTotalAmount(seats));
        booking.setStatus("BOOKED");

        Booking savedBooking = bookingRepository.save(booking);

        // Create booking seats and mark seats as unavailable
        for (Seat seat : seats) {
            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setBooking(savedBooking);
            bookingSeat.setSeat(seat);
            bookingSeatRepository.save(bookingSeat);

            // Mark seat as unavailable
            seat.setIsAvailable(false);
            seatRepository.save(seat);
        }

        return convertToResponseDto(savedBooking);
    }

    public List<BookingResponseDto> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserUserId(userId);
        return bookings.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public BookingResponseDto getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new CustomException("Booking not found with id: " + bookingId));
        return convertToResponseDto(booking);
    }

    public BookingResponseDto cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new CustomException("Booking not found with id: " + bookingId));

        if ("CANCELLED".equals(booking.getStatus())) {
            throw new CustomException("Booking is already cancelled");
        }

        // Update booking status
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        // Release seats
        List<BookingSeat> bookingSeats = bookingSeatRepository.findByBookingBookingId(bookingId);
        for (BookingSeat bookingSeat : bookingSeats) {
            Seat seat = bookingSeat.getSeat();
            seat.setIsAvailable(true);
            seatRepository.save(seat);
        }

        return convertToResponseDto(booking);
    }

    public Map<String, Object> getBookingAnalytics() {
        List<Booking> allBookings = bookingRepository.findAll();
        
        long totalBookings = allBookings.size();
        long bookedCount = allBookings.stream().filter(b -> "BOOKED".equals(b.getStatus())).count();
        long cancelledCount = allBookings.stream().filter(b -> "CANCELLED".equals(b.getStatus())).count();
        double totalRevenue = allBookings.stream()
                .filter(b -> "BOOKED".equals(b.getStatus()))
                .mapToDouble(Booking::getTotalAmount)
                .sum();
        
        return Map.of(
            "totalBookings", totalBookings,
            "bookedCount", bookedCount,
            "cancelledCount", cancelledCount,
            "totalRevenue", totalRevenue
        );
    }

    public boolean isOwner(Long userId, String email) {
        return userRepository.findById(userId)
                .map(user -> user.getEmail().equals(email))
                .orElse(false);
    }

    private Double calculateTotalAmount(List<Seat> seats) {
        // Simple pricing: 100 per seat (can be enhanced based on bus type, distance, etc.)
        return seats.size() * 100.0;
    }

    private BookingResponseDto convertToResponseDto(Booking booking) {
        BookingResponseDto dto = new BookingResponseDto();
        dto.setBookingId(booking.getBookingId());
        dto.setUserId(booking.getUser().getUserId());
        dto.setUserName(booking.getUser().getName());
        dto.setBusId(booking.getBus().getBusId());
        dto.setBusName(booking.getBus().getBusName());
        dto.setSource(booking.getBus().getSource());
        dto.setDestination(booking.getBus().getDestination());
        dto.setBookingDate(booking.getBookingDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        dto.setCreatedAt(booking.getCreatedAt());

        List<BookingResponseDto.SeatInfoDto> seatDtos = booking.getBookingSeats().stream()
                .map(bookingSeat -> new BookingResponseDto.SeatInfoDto(
                        bookingSeat.getSeat().getSeatId(),
                        bookingSeat.getSeat().getSeatNumber()
                ))
                .collect(Collectors.toList());
        dto.setSeats(seatDtos);

        return dto;
    }
}