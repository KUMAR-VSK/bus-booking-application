package com.busbooking.controller;

import com.busbooking.dto.BookingRequestDto;
import com.busbooking.dto.BookingResponseDto;
import com.busbooking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearer-jwt")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @Operation(summary = "Create a new booking", description = "Create a booking for authenticated users")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingResponseDto> createBooking(@RequestBody BookingRequestDto dto) {
        return ResponseEntity.ok(bookingService.createBooking(dto));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user bookings", description = "Get all bookings for a specific user")
    @PreAuthorize("hasRole('USER') or @bookingService.isOwner(#userId, authentication.name) or hasAnyRole('BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<List<BookingResponseDto>> getUserBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @GetMapping("/{bookingId}")
    @Operation(summary = "Get booking details", description = "Get details of a specific booking")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingResponseDto> getBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }

    @PutMapping("/{bookingId}/cancel")
    @Operation(summary = "Cancel booking", description = "Cancel a specific booking")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingResponseDto> cancelBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Get booking analytics", description = "Get booking analytics (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getBookingAnalytics() {
        return ResponseEntity.ok(bookingService.getBookingAnalytics());
    }
}
