package com.busbooking.controller;

import com.busbooking.dto.*;
import com.busbooking.service.BookingWorkflowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking-workflow")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearer-jwt")
public class BookingWorkflowController {

    private final BookingWorkflowService bookingWorkflowService;

    public BookingWorkflowController(BookingWorkflowService bookingWorkflowService) {
        this.bookingWorkflowService = bookingWorkflowService;
    }

    @PostMapping("/search-buses")
    @Operation(summary = "Search buses with advanced filters", description = "Search buses with date, passenger count, and sorting options")
    public ResponseEntity<List<BusSearchResultDto>> searchBuses(@Valid @RequestBody BusSearchRequestDto searchRequest) {
        return ResponseEntity.ok(bookingWorkflowService.searchBuses(searchRequest));
    }

    @GetMapping("/bus-details/{busId}")
    @Operation(summary = "Get detailed bus information", description = "Get complete bus details including amenities and rating")
    public ResponseEntity<BusSearchResultDto> getBusDetails(@PathVariable Long busId, 
                                                           @RequestParam LocalDate travelDate) {
        return ResponseEntity.ok(bookingWorkflowService.getBusDetails(busId, travelDate));
    }

    @GetMapping("/seat-availability/{busId}")
    @Operation(summary = "Get seat availability and layout", description = "Get seat layout with availability status for specific date")
    public ResponseEntity<List<BusSearchResultDto.SeatInfoDto>> getSeatAvailability(
            @PathVariable Long busId, 
            @RequestParam LocalDate travelDate) {
        return ResponseEntity.ok(bookingWorkflowService.getSeatAvailability(busId, travelDate));
    }

    @PostMapping("/hold-seats")
    @Operation(summary = "Hold seats temporarily", description = "Temporarily hold selected seats for 15 minutes")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<SeatHoldResponseDto> holdSeats(@RequestBody SeatHoldRequestDto holdRequest) {
        return ResponseEntity.ok(bookingWorkflowService.holdSeats(holdRequest));
    }

    @PostMapping("/release-seats")
    @Operation(summary = "Release held seats", description = "Release temporarily held seats")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<String> releaseSeats(@RequestBody SeatReleaseRequestDto releaseRequest) {
        bookingWorkflowService.releaseSeats(releaseRequest);
        return ResponseEntity.ok("Seats released successfully");
    }

    @PostMapping("/initiate-booking")
    @Operation(summary = "Initiate booking process", description = "Start booking with passenger details and selected seats")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingInitiationResponseDto> initiateBooking(
            @Valid @RequestBody BookingInitiationRequestDto initiationRequest) {
        return ResponseEntity.ok(bookingWorkflowService.initiateBooking(initiationRequest));
    }

    @PostMapping("/process-payment")
    @Operation(summary = "Process payment", description = "Process payment for the booking")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<PaymentResponseDto> processPayment(
            @Valid @RequestBody PaymentRequestDto paymentRequest) {
        return ResponseEntity.ok(bookingWorkflowService.processPayment(paymentRequest));
    }

    @PostMapping("/confirm-booking")
    @Operation(summary = "Confirm booking", description = "Confirm booking after successful payment")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingWorkflowDto> confirmBooking(@RequestParam String paymentId) {
        return ResponseEntity.ok(bookingWorkflowService.confirmBooking(paymentId));
    }

    @GetMapping("/booking-details/{bookingReference}")
    @Operation(summary = "Get booking details", description = "Get complete booking details by reference number")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingWorkflowDto> getBookingDetails(@PathVariable String bookingReference) {
        return ResponseEntity.ok(bookingWorkflowService.getBookingDetails(bookingReference));
    }

    @GetMapping("/my-bookings")
    @Operation(summary = "Get user bookings", description = "Get all bookings for the authenticated user")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<List<BookingWorkflowDto>> getMyBookings() {
        return ResponseEntity.ok(bookingWorkflowService.getMyBookings());
    }

    @PostMapping("/cancel-booking/{bookingReference}")
    @Operation(summary = "Cancel booking", description = "Cancel booking and process refund")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<CancellationResponseDto> cancelBooking(@PathVariable String bookingReference) {
        return ResponseEntity.ok(bookingWorkflowService.cancelBooking(bookingReference));
    }

    @GetMapping("/track-booking/{bookingReference}")
    @Operation(summary = "Track booking status", description = "Get real-time booking tracking information")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingTrackingDto> trackBooking(@PathVariable String bookingReference) {
        return ResponseEntity.ok(bookingWorkflowService.trackBooking(bookingReference));
    }

    @GetMapping("/track-bus/{busId}")
    @Operation(summary = "Track bus location", description = "Get real-time bus tracking information")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<BusTrackingDto> trackBus(@PathVariable Long busId) {
        return ResponseEntity.ok(bookingWorkflowService.trackBus(busId));
    }

    @PostMapping("/download-ticket/{bookingReference}")
    @Operation(summary = "Download ticket", description = "Generate and download e-ticket PDF")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<byte[]> downloadTicket(@PathVariable String bookingReference) {
        byte[] ticketPdf = bookingWorkflowService.downloadTicket(bookingReference);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=ticket_" + bookingReference + ".pdf")
                .body(ticketPdf);
    }

    @PostMapping("/send-ticket-email/{bookingReference}")
    @Operation(summary = "Send ticket via email", description = "Send e-ticket to passenger email")
    @PreAuthorize("hasAnyRole('USER', 'BUS_MANAGER', 'ADMIN')")
    public ResponseEntity<String> sendTicketEmail(@PathVariable String bookingReference) {
        bookingWorkflowService.sendTicketEmail(bookingReference);
        return ResponseEntity.ok("Ticket sent successfully to your email");
    }
}
